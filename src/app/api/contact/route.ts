import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Type definitions
interface ContactRequest {
  firstName: string;
  lastName?: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactRequest;
    const { firstName, lastName, email, message } = body;

    // Validate required fields
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email notification to company
    const { data, error } = await resend.emails.send({
      from: 'Bafuputsi Contact Form <onboarding@resend.dev>',
      to: ['admin@bafuputsi.co.za'],
      subject: `New Contact Form Submission from ${firstName} ${lastName || ''}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #393942; color: white; padding: 20px; text-align: center; }
              .content { background: #f9f9f9; padding: 30px; margin-top: 20px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #8a624a; }
              .value { margin-top: 5px; }
              .footer { margin-top: 20px; padding: 20px; text-align: center; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${firstName} ${lastName || ''}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from the Bafuputsi Trading contact form</p>
                <p>Sent at: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send auto-reply to user
    await resend.emails.send({
      from: 'Bafuputsi Trading <onboarding@resend.dev>',
      to: [email],
      subject: 'Thank you for contacting Bafuputsi Trading',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #c5ab95; color: white; padding: 30px; text-align: center; }
              .content { padding: 30px; background: #f9f9f9; margin-top: 20px; }
              .cta { background: #393942; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; margin-top: 20px; border-radius: 5px; }
              .footer { margin-top: 20px; padding: 20px; text-align: center; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You for Reaching Out!</h1>
              </div>
              <div class="content">
                <p>Dear ${firstName},</p>
                <p>Thank you for contacting Bafuputsi Trading. We have received your message and will get back to you within 24 hours.</p>
                <p>In the meantime, feel free to call us at <strong>+27 62 323 2533</strong> if you have an urgent matter.</p>
                <p><strong>Our Office Hours:</strong></p>
                <ul>
                  <li>Mon - Wed: 8:00am - 06:00pm</li>
                  <li>Thu - Sat: 10:00am - 10:00pm</li>
                  <li>Sunday: Closed</li>
                </ul>
                <p>We look forward to assisting you with your labour law and HR consulting needs.</p>
                <p>Best regards,<br>Bafuputsi Trading Team</p>
              </div>
              <div class="footer">
                <p>Bafuputsi Trading - Management and Labour Consultants</p>
                <p>Centurion, South Africa | admin@bafuputsi.co.za | +27 62 323 2533</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
