import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: ContactNotification = await req.json();
    console.log("Received contact notification:", contactData);

    // Server-side validation
    if (!contactData.name || contactData.name.trim().length === 0) {
      throw new Error("Name is required");
    }
    if (!contactData.email || contactData.email.trim().length === 0) {
      throw new Error("Email is required");
    }
    if (!contactData.message || contactData.message.trim().length === 0) {
      throw new Error("Message is required");
    }
    if (contactData.name.length > 100) {
      throw new Error("Name must be less than 100 characters");
    }
    if (contactData.email.length > 255) {
      throw new Error("Email must be less than 255 characters");
    }
    if (contactData.message.length > 2000) {
      throw new Error("Message must be less than 2000 characters");
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
            <h2 style="color: #667eea; margin: 0 0 10px 0; font-size: 18px;">Contact Information</h2>
            <p style="margin: 8px 0; color: #374151;"><strong>Name:</strong> ${contactData.name}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:${contactData.email}" style="color: #667eea;">${contactData.email}</a></p>
            ${contactData.phone ? `<p style="margin: 8px 0; color: #374151;"><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
            ${contactData.company ? `<p style="margin: 8px 0; color: #374151;"><strong>Company:</strong> ${contactData.company}</p>` : ''}
            ${contactData.purpose ? `<p style="margin: 8px 0; color: #374151;"><strong>Purpose:</strong> ${contactData.purpose}</p>` : ''}
          </div>
          
          <div style="margin-bottom: 20px;">
            <h2 style="color: #667eea; margin: 0 0 10px 0; font-size: 18px;">Message</h2>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; color: #374151; line-height: 1.6;">
              ${contactData.message.replace(/\n/g, '<br>')}
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

    // Call Resend API directly
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["kusasirakweet@gmail.com"],
        subject: `New Contact: ${contactData.name} - ${contactData.purpose || 'General Inquiry'}`,
        html: emailHtml,
        reply_to: contactData.email,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error("Resend API error:", errorData);
      throw new Error(`Resend API error: ${JSON.stringify(errorData)}`);
    }

    const data = await resendResponse.json();
    console.log("Email sent successfully:", data);

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
