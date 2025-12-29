import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get API keys from Cloudflare runtime environment
    const spamidateApiKey = locals.runtime?.env?.SPAMIDATE_API_KEY || import.meta.env.SPAMIDATE_API_KEY;
    const emailApiKey = locals.runtime?.env?.EMAIL_API_KEY || import.meta.env.EMAIL_API_KEY;

    if (!emailApiKey) {
      console.error('EMAIL_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email with Spamidate before sending
    if (spamidateApiKey) {
      const validationResponse = await fetch('https://api.spamidate.com/validate', {
        method: 'POST',
        headers: {
          'X-API-Key': spamidateApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (validationResponse.ok) {
        const validation = await validationResponse.json();

        // Block invalid emails
        if (!validation.isValid) {
          return new Response(
            JSON.stringify({
              error: 'Invalid email address',
              message: validation.recommendations[0] || 'Email validation failed',
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        // Block disposable emails
        if (!validation.checks.disposable?.passed) {
          return new Response(
            JSON.stringify({
              error: 'Disposable email not allowed',
              message: 'Please use a permanent email address',
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        // Warn about low-quality emails but allow them
        if (validation.score < 70) {
          console.warn(`Low quality email submission: ${email} (score: ${validation.score})`);
        }
      } else {
        console.error('Spamidate validation failed:', await validationResponse.text());
        // Continue anyway if validation service is down
      }
    }

    // Send email via the email API
    const emailResponse = await fetch('https://mail-api.techflunky.com/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${emailApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'hello@techflunkylabs.com',
        replyTo: email,
        subject: `Contact Form: ${subject}`,
        html: `
          <div style="font-family: 'Space Grotesk', system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #000000; color: #f4f4f5; padding: 40px 30px; border-radius: 8px;">
              <h2 style="color: #e0ff00; margin-top: 0;">New Contact Form Submission</h2>

              <div style="background-color: #1a1a1a; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 8px 0;"><strong style="color: #e0ff00;">From:</strong> ${name}</p>
                <p style="margin: 8px 0;"><strong style="color: #e0ff00;">Email:</strong> ${email}</p>
                <p style="margin: 8px 0;"><strong style="color: #e0ff00;">Subject:</strong> ${subject}</p>
              </div>

              <div style="background-color: #1a1a1a; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 8px 0 12px 0;"><strong style="color: #e0ff00;">Message:</strong></p>
                <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; text-align: center;">
                <p style="color: #888; font-size: 12px; margin: 0;">
                  This email was sent from the TechFlunky Labs contact form
                  <br>
                  <a href="https://techflunkylabs.com" style="color: #e0ff00; text-decoration: none;">techflunkylabs.com</a>
                </p>
              </div>
            </div>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Email API error:', emailResponse.status, errorText);

      return new Response(
        JSON.stringify({
          error: 'Failed to send email',
          details: errorText,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
