import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get Spamidate API key from Cloudflare runtime environment
    const spamidateApiKey = locals.runtime?.env?.SPAMIDATE_API_KEY || import.meta.env.SPAMIDATE_API_KEY;

    if (!spamidateApiKey) {
      console.error('SPAMIDATE_API_KEY not configured');
      // Return a basic validation if API key is not configured
      return new Response(
        JSON.stringify({
          email,
          isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
          severity: 'unknown',
          score: 50,
          checks: {
            syntax: { passed: true, message: 'Basic syntax check' },
          },
          recommendations: ['API key not configured - using basic validation'],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate with Spamidate API
    const response = await fetch('https://api.spamidate.com/validate', {
      method: 'POST',
      headers: {
        'X-API-Key': spamidateApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Spamidate API error:', response.status, errorText);

      return new Response(
        JSON.stringify({
          error: 'Email validation service unavailable',
          details: errorText,
        }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email validation error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
