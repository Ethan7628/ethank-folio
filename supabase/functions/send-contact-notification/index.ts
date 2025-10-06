import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "resend";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactNotification {
  id: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  created_at: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const contactData: ContactNotification = await req.json();

    console.log('Sending email notification for contact:', contactData.id);

    // Send email notification to you
    const emailResponse = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['kusasirakweethan31@gmail.com'],
      subject: `🚨 New Contact: ${contactData.name} reached out!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
          <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; font-size: 28px; margin: 0;">💼 New Client Inquiry</h1>
              <p style="color: #666; font-size: 16px; margin: 10px 0 0 0;">Someone is interested in your services!</p>
            </div>
            
            <div style="background: #f8f9fa; border-radius: 10px; padding: 25px; margin: 20px 0;">
              <h2 style="color: #495057; font-size: 22px; margin: 0 0 20px 0; border-bottom: 2px solid #e9ecef; padding-bottom: 10px;">📋 Contact Details</h2>
              
              <div style="display: grid; gap: 15px;">
                <div style="display: flex; align-items: center;">
                  <span style="background: #007bff; color: white; padding: 8px 12px; border-radius: 6px; font-weight: bold; margin-right: 15px; min-width: 80px; text-align: center;">👤 Name</span>
                  <span style="font-size: 16px; color: #333; font-weight: 600;">${contactData.name}</span>
                </div>
                
                <div style="display: flex; align-items: center;">
                  <span style="background: #28a745; color: white; padding: 8px 12px; border-radius: 6px; font-weight: bold; margin-right: 15px; min-width: 80px; text-align: center;">✉️ Email</span>
                  <a href="mailto:${contactData.email}" style="font-size: 16px; color: #007bff; text-decoration: none;">${contactData.email}</a>
                </div>
                
                ${contactData.phone ? `
                <div style="display: flex; align-items: center;">
                  <span style="background: #ffc107; color: #333; padding: 8px 12px; border-radius: 6px; font-weight: bold; margin-right: 15px; min-width: 80px; text-align: center;">📱 Phone</span>
                  <a href="tel:${contactData.phone}" style="font-size: 16px; color: #007bff; text-decoration: none;">${contactData.phone}</a>
                </div>
                ` : ''}
                
                ${contactData.company ? `
                <div style="display: flex; align-items: center;">
                  <span style="background: #17a2b8; color: white; padding: 8px 12px; border-radius: 6px; font-weight: bold; margin-right: 15px; min-width: 80px; text-align: center;">🏢 Company</span>
                  <span style="font-size: 16px; color: #333; font-weight: 600;">${contactData.company}</span>
                </div>
                ` : ''}
                
                <div style="display: flex; align-items: center;">
                  <span style="background: #6f42c1; color: white; padding: 8px 12px; border-radius: 6px; font-weight: bold; margin-right: 15px; min-width: 80px; text-align: center;">🕒 Time</span>
                  <span style="font-size: 16px; color: #333;">${new Date(contactData.created_at).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #1976d2; margin: 0 0 15px 0; font-size: 18px;">💬 Message</h3>
              <p style="color: #333; line-height: 1.6; margin: 0; font-size: 15px; white-space: pre-wrap;">${contactData.message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <div style="background: linear-gradient(45deg, #667eea, #764ba2); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                <h3 style="color: white; margin: 0; font-size: 18px;">🚀 Quick Actions</h3>
              </div>
              
              <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:${contactData.email}?subject=Re: Your inquiry - Let's discuss your project&body=Hi ${contactData.name},%0A%0AThank you for reaching out! I've reviewed your message and I'm excited to discuss your project further.%0A%0ABest regards,%0AEthan Kusasirakwe" 
                   style="background: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 5px;">
                  📧 Reply via Email
                </a>
                
                ${contactData.phone ? `
                <a href="tel:${contactData.phone}" 
                   style="background: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 5px;">
                  📞 Call Now
                </a>
                ` : ''}
                
                <a href="https://calendly.com/kusasirakweethan31" 
                   style="background: #ffc107; color: #333; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 5px;">
                  📅 Schedule Meeting
                </a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; font-size: 14px; margin: 0;">
                📊 <strong>Contact ID:</strong> ${contactData.id}<br>
                🌐 <em>This notification was sent automatically from your portfolio contact form</em>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification email sent successfully',
        emailId: emailResponse.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send notification email', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});