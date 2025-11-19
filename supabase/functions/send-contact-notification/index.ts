import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

// Get Gmail SMTP credentials from environment variables
const GMAIL_USER = Deno.env.get("GMAIL_USER");
const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

const escapeHtml = (text: string) => {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders
    });
  }

  try {
    const contactData = await req.json();
    console.log("Received contact notification:", JSON.stringify(contactData, null, 2));

    // Server-side validation
    if (!contactData.name || contactData.name.trim().length === 0) {
      return new Response(JSON.stringify({
        error: "Name is required"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }

    if (!contactData.email || contactData.email.trim().length === 0) {
      return new Response(JSON.stringify({
        error: "Email is required"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }

    if (!contactData.message || contactData.message.trim().length === 0) {
      return new Response(JSON.stringify({
        error: "Message is required"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }

    // Length validation
    if (contactData.name.length > 100) {
      return new Response(JSON.stringify({
        error: "Name must be less than 100 characters"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }

    if (contactData.email.length > 255) {
      return new Response(JSON.stringify({
        error: "Email must be less than 255 characters"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }

    if (contactData.message.length > 2000) {
      return new Response(JSON.stringify({
        error: "Message must be less than 2000 characters"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return new Response(JSON.stringify({
        error: "Invalid email format"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }

    // Check if SMTP credentials are available
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      throw new Error("Gmail SMTP credentials are not configured");
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">📩 New Contact Form Submission</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
            <h2 style="color: #667eea; margin: 0 0 15px 0; font-size: 18px;">📋 Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #374151;">${escapeHtml(contactData.name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(contactData.email)}" style="color: #667eea; text-decoration: none;">${escapeHtml(contactData.email)}</a></td>
              </tr>
              ${contactData.phone ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Phone:</td>
                <td style="padding: 8px 0; color: #374151;">${escapeHtml(contactData.phone)}</td>
              </tr>
              ` : ''}
              ${contactData.company ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Company:</td>
                <td style="padding: 8px 0; color: #374151;">${escapeHtml(contactData.company)}</td>
              </tr>
              ` : ''}
              ${contactData.purpose ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Purpose:</td>
                <td style="padding: 8px 0; color: #374151;"><span style="background: #ede9fe; color: #7c3aed; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500;">${escapeHtml(contactData.purpose)}</span></td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h2 style="color: #667eea; margin: 0 0 10px 0; font-size: 18px;">💬 Message</h2>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; color: #374151; line-height: 1.6; font-size: 14px;">
              ${escapeHtml(contactData.message).replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 2px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
              📅 Received: ${contactData.created_at ? new Date(contactData.created_at).toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Africa/Kampala'
    }) : new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Africa/Kampala'
    })}
            </p>
            ${contactData.id ? `<p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
              🔑 ID: ${contactData.id}
            </p>` : ''}
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #0369a1; font-size: 13px;">
              💡 <strong>Quick Reply:</strong> Just hit "Reply" to respond directly to ${escapeHtml(contactData.name)}
            </p>
          </div>
        </div>
      </div>
    `;

    // Create SMTP client for Gmail
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 587,
        tls: true,
        auth: {
          username: GMAIL_USER,
          password: GMAIL_APP_PASSWORD,
        },
      },
    });

    // Send email via Gmail SMTP
    await client.send({
      from: `"Portfolio Contact" <${GMAIL_USER}>`,
      to: `kusasirakwe.ethan.upti@gmail.com`,
      replyTo: `"${contactData.name}" <${contactData.email}>`,
      subject: `New Contact: ${escapeHtml(contactData.name)} - ${escapeHtml(contactData.purpose || 'General Inquiry')}`,
      html: emailHtml,
    });

    // Close the SMTP connection
    await client.close();

    console.log("Email sent successfully via Gmail SMTP");

    return new Response(JSON.stringify({
      success: true,
      data: { success: true }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });

  } catch (error: any) {
    console.error("Error in send-contact-notification:", error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }
};

serve(handler);