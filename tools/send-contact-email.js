#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

function usage() {
  console.log('Usage: node send-contact-email.js <json-file-path>');
  console.log('Or pipe JSON to the script via stdin.');
}

async function main() {
  let input = '';

  if (process.argv[2]) {
    const filePath = path.resolve(process.cwd(), process.argv[2]);
    if (!fs.existsSync(filePath)) {
      console.error('JSON file not found:', filePath);
      process.exit(2);
    }
    input = fs.readFileSync(filePath, 'utf-8');
  } else {
    // read stdin
    input = await new Promise((resolve) => {
      let data = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', chunk => data += chunk);
      process.stdin.on('end', () => resolve(data));
    });
  }

  if (!input) {
    usage();
    process.exit(1);
  }

  let contact;
  try {
    contact = JSON.parse(input);
  } catch (err) {
    console.error('Failed to parse JSON input:', err);
    process.exit(3);
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    SEND_TO
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !SEND_TO) {
    console.error('Missing SMTP configuration in .env.local. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SEND_TO');
    process.exit(4);
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
          <h2 style="color: #667eea; margin: 0 0 10px 0; font-size: 18px;">Contact Information</h2>
          <p style="margin: 8px 0; color: #374151;"><strong>Name:</strong> ${contact.name}</p>
          <p style="margin: 8px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:${contact.email}" style="color: #667eea;">${contact.email}</a></p>
          ${contact.phone ? `<p style="margin: 8px 0; color: #374151;"><strong>Phone:</strong> ${contact.phone}</p>` : ''}
          ${contact.company ? `<p style="margin: 8px 0; color: #374151;"><strong>Company:</strong> ${contact.company}</p>` : ''}
          ${contact.purpose ? `<p style="margin: 8px 0; color: #374151;"><strong>Purpose:</strong> ${contact.purpose}</p>` : ''}
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #667eea; margin: 0 0 10px 0; font-size: 18px;">Message</h2>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; color: #374151; line-height: 1.6;">
            ${String(contact.message || '').replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="text-align: center; padding-top: 20px; border-top: 2px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
            Received on: ${new Date(contact.created_at || Date.now()).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
            Submission ID: ${contact.id || 'n/a'}
          </p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: SMTP_FROM,
    to: SEND_TO.split(',').map(s => s.trim()),
    subject: `Portfolio Contact — ${contact.name || 'New Submission'} — ${contact.purpose || 'General'}`,
    html: emailHtml,
    replyTo: contact.email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent:', info.messageId);
    console.log('Preview URL (if available):', nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : 'N/A');
    console.log(JSON.stringify(info, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Failed to send email:', err);
    process.exit(5);
  }
}

main();
