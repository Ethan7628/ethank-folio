require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Email transporter setup
let transporter = null;

// Initialize email transporter based on configuration
const initializeEmailTransporter = () => {
  // Try Resend first if API key is available
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      console.log('✉️ Resend email service initialized');
      return resend;
    } catch (error) {
      console.log('⚠️ Resend initialization failed, falling back to SMTP');
    }
  }

  // Fall back to nodemailer with SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('✉️ SMTP email service initialized');
    return 'smtp';
  }

  console.log('⚠️ No email service configured (Resend or SMTP)');
  return null;
};

let emailService = null;

// Initialize database and email on startup
const initializeDatabase = async () => {
  try {
    // Test database connection
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    client.release();

    // Initialize email service
    emailService = initializeEmailTransporter();

    // Log email configuration status
    console.log('📧 Email configuration check:', {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
      SEND_TO: !!process.env.SEND_TO,
      Resend_Configured: emailService === 'resend' || (emailService && emailService.emails),
      SMTP_Configured: emailService === 'smtp',
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Initialize on startup
initializeDatabase();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, phone, company, purpose } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, message' });
    }

    console.log('📨 Received contact form:', { name, email, message, phone, company, purpose });

    // Save to database
    console.log('💾 Attempting to save contact to database...');
    const query = `
      INSERT INTO contacts (name, email, message, phone, company, purpose)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, created_at
    `;
    const result = await pool.query(query, [name, email, message, phone || null, company || null, purpose || null]);
    const { id, created_at } = result.rows[0];
    console.log('✅ Contact saved to database:', { id, created_at });

    // Send email notification if configured
    if (emailService) {
      try {
        const emailContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Purpose:</strong> ${purpose || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted at: ${new Date().toISOString()}</small></p>
        `;

        if (emailService === 'resend' || (emailService && emailService.emails)) {
          // Send via Resend
          await emailService.emails.send({
            from: `noreply@${process.env.RESEND_DOMAIN || 'folio.local'}`,
            to: process.env.SEND_TO,
            subject: `New Contact Form Submission from ${name}`,
            html: emailContent,
          });
          console.log('✉️ Email sent via Resend to:', process.env.SEND_TO);
        } else if (emailService === 'smtp' && transporter) {
          // Send via SMTP
          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.SEND_TO,
            subject: `New Contact Form Submission from ${name}`,
            html: emailContent,
          });
          console.log('✉️ Email sent via SMTP to:', process.env.SEND_TO);
        }
      } catch (emailError) {
        console.error('⚠️ Email sending failed (non-critical):', emailError.message);
        // Don't fail the API response if email fails - the contact was still saved to DB
      }
    }

    // Return success response
    res.status(200).json({
      ok: true,
      id,
      created_at,
      message: 'Contact saved successfully',
    });
  } catch (error) {
    console.error('❌ Database error:', error);
    res.status(500).json({
      error: 'Failed to save contact',
      details: error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Available at your primary URL https://form-server-ixq1.onrender.com`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  pool.end();
  process.exit(0);
});
