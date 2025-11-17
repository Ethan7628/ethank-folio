import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const SENDGRID_API_KEY = Deno.env.get("SEND_GRID_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactNotification {
  id: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  purpose?: string;
  created_at: string;
}

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: ContactNotification = await req.json();
    console.log("Received contact notification");

    // Server-side validation
    if (!contactData.name || contactData.name.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Name is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (!contactData.email || contactData.email.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (!contactData.message || contactData.message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Length validation
    if (contactData.name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Name must be less than 100 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (contactData.email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Email must be less than 255 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (contactData.message.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Message must be less than 2000 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
            <h2 style="color: #667eea; margin: 0 0 10px 0; font-size: 18px;">Contact Information</h2>
            <p style="margin: 8px 0; color: #374151;"><strong>Name:</strong> ${escapeHtml(contactData.name)}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:${escapeHtml(contactData.email)}" style="color: #667eea;">${escapeHtml(contactData.email)}</a></p>
            ${contactData.phone ? `<p style="margin: 8px 0; color: #374151;"><strong>Phone:</strong> ${escapeHtml(contactData.phone)}</p>` : ''}
            ${contactData.company ? `<p style="margin: 8px 0; color: #374151;"><strong>Company:</strong> ${escapeHtml(contactData.company)}</p>` : ''}
            ${contactData.purpose ? `<p style="margin: 8px 0; color: #374151;"><strong>Purpose:</strong> ${escapeHtml(contactData.purpose)}</p>` : ''}
          </div>
          
          <div style="margin-bottom: 20px;">
            <h2 style="color: #667eea; margin: 0 0 10px 0; font-size: 18px;">Message</h2>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; color: #374151; line-height: 1.6;">
              ${escapeHtml(contactData.message).replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 2px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
              Received on: ${new Date(contactData.created_at).toLocaleString('en-US', { 
                dateStyle: 'full', 
                timeStyle: 'short' 
              })}
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
              Submission ID: ${contactData.id}
            </p>
          </div>
        </div>
      </div>
    `;

    // Call SendGrid API
    const sendgridResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "kusasirakweet@gmail.com" }],
            subject: `New Contact: ${escapeHtml(contactData.name)} - ${escapeHtml(contactData.purpose || 'General Inquiry')}`,
          }
        ],
        from: {
          email: "kusasirakweethan31@gmail.com",
          name: "Portfolio Contact"
        },
        reply_to: {
          email: contactData.email,
          name: contactData.name
        },
        content: [
          {
            type: "text/html",
            value: emailHtml
          }
        ]
      }),
    });

    if (!sendgridResponse.ok) {
      const errorText = await sendgridResponse.text();
      console.error("SendGrid API error:", errorText);
      throw new Error(`SendGrid API error: ${errorText}`);
    }

    console.log("Email sent successfully via SendGrid");
    const data = { success: true };

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
