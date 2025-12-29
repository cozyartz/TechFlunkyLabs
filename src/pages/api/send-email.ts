/**
 * API endpoint for sending emails
 * POST /api/send-email
 */

import type { APIRoute } from 'astro';
import { sendEmail } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get API key from environment
    const apiKey = import.meta.env.EMAIL_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const body = await request.json();
    const { to, subject, html, from, fromName, replyTo } = body;

    // Validate required fields
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, html' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email
    const result = await sendEmail({
      to,
      subject,
      html,
      from,
      fromName,
      replyTo,
    }, apiKey);

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: result.error || 'Failed to send email' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Email API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
