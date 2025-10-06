
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "resend";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const { name, email, message, phone, company }: ContactRequest = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    // Send email notification to you
    const emailResponse = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['kusasirakweethan31@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from your portfolio contact form.</em></p>
      `,
    });

    // Send confirmation email to the client
    await resend.emails.send({
      from: 'Ethan Kusasirakwe <onboarding@resend.dev>',
      to: [email],
      subject: 'Thank you for contacting me!',
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>I've received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Best regards,<br>
        Ethan Kusasirakwe<br>
        Full Stack Developer</p>
      `,
    });

    console.log('Emails sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email. Please try again.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
