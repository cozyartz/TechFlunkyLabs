# Spamidate Integration Setup

This guide explains how to activate the Spamidate email validation protection on the TechFlunky Labs contact form.

## What's Already Implemented

The contact form is fully integrated with Spamidate and includes:

✅ **Real-time email validation** - As users type their email, it's validated against Spamidate's 16 validation checks
✅ **Visual feedback** - Color-coded input borders (green/yellow/red) based on email quality score
✅ **Disposable email blocking** - Prevents temporary/disposable email addresses
✅ **Server-side validation** - Double-checks emails before sending to prevent spam
✅ **Spamidate branding** - "Protected by Spamidate" badge on the form

## API Endpoints

### `/api/validate-email` (GET)
Real-time email validation endpoint used by the contact form.

**Request:**
```json
POST /api/validate-email
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "email": "user@example.com",
  "isValid": true,
  "severity": "valid",
  "score": 95,
  "checks": {
    "syntax": { "passed": true, "message": "Email syntax is valid" },
    "domain": { "passed": true, "message": "Domain exists" },
    "mxRecords": { "passed": true, "message": "Found 2 MX records" },
    "disposable": { "passed": true, "message": "Not disposable" }
  },
  "recommendations": ["Email passed all validation checks"]
}
```

### `/api/contact` (POST)
Contact form submission endpoint with Spamidate validation.

**Request:**
```json
POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Validation Rules:**
- Email must pass Spamidate validation (`isValid: true`)
- Disposable emails are blocked
- Emails with score < 70 are logged but allowed
- Email is sent to `hello@techflunkylabs.com` via the email API

## Required Environment Variables

### Local Development (`.dev.vars`)

Add your Spamidate API key to `.dev.vars`:

```bash
EMAIL_API_KEY=your_email_api_key_here
SPAMIDATE_API_KEY=your_spamidate_api_key_here
```

> **Note**: Get your EMAIL_API_KEY from the VM at `/opt/email-api/.env`

### Production (Cloudflare Pages)

Add the `SPAMIDATE_API_KEY` environment variable in Cloudflare Pages:

1. Go to your Cloudflare Pages project
2. Navigate to **Settings** → **Environment variables**
3. Add a new variable:
   - **Variable name**: `SPAMIDATE_API_KEY`
   - **Value**: Your Spamidate API key from https://spamidate.com/dashboard
   - **Environment**: Production (and Preview if desired)
4. Click **Save**
5. Redeploy the site for changes to take effect

## Getting a Spamidate API Key

1. Visit https://spamidate.com
2. Sign up for a free account (100 validations/month)
3. Go to https://spamidate.com/dashboard
4. Copy your API key
5. Add it to `.dev.vars` and Cloudflare Pages environment variables

## Fallback Behavior

If `SPAMIDATE_API_KEY` is not configured:

- **Validation endpoint** returns basic syntax validation (regex check only)
- **Contact endpoint** sends emails without Spamidate validation
- **No errors** - The form continues to work with reduced protection

This ensures the site remains functional even if the API key is temporarily unavailable.

## Testing the Integration

### Local Testing

1. Add your Spamidate API key to `.dev.vars`
2. Start the dev server: `npm run dev`
3. Navigate to `http://localhost:4321/#contact`
4. Try submitting with different email types:
   - Valid email: `test@gmail.com` - Should show green border, score ~90-100
   - Disposable email: `test@tempmail.com` - Should show warning, block submission
   - Invalid email: `invalid@` - Should show red border, block submission

### Production Testing

1. Add your Spamidate API key to Cloudflare Pages environment variables
2. Deploy the site: `npm run deploy`
3. Visit the live site and test the contact form
4. Check the Spamidate dashboard for validation logs

## Spamidate Service Display

Spamidate is showcased in multiple places on the site:

1. **Services Section** - Featured service card with yellow ring border and "Featured" badge
2. **Projects Section** - Project card with link to https://spamidate.com
3. **Contact Form** - "Protected by Spamidate" badge at the bottom of the form

## Validation Metrics

Monitor your Spamidate usage and email quality:

- **Dashboard**: https://spamidate.com/dashboard
- **Validation logs** show all API calls with scores
- **Email quality trends** help identify spam patterns
- **Rate limit tracking** ensures you stay within your tier limits

## Troubleshooting

### "Email validation service unavailable"
- Check that `SPAMIDATE_API_KEY` is set correctly
- Verify your API key is active at https://spamidate.com/dashboard
- Check Cloudflare Pages environment variables

### Emails not validating in real-time
- Open browser DevTools → Network tab
- Look for `/api/validate-email` requests
- Check for errors in the response

### Contact form not submitting
- Check browser console for errors
- Verify email passed validation (green border)
- Ensure disposable email check passed

### Rate limit exceeded
- Upgrade your Spamidate tier at https://spamidate.com/pricing
- Current tier limits:
  - Free: 100 validations/month, 5/min
  - Hobby: 2,500 validations/month, 10/min
  - Growth: 5,000 validations/month, 10/min (with 20% buffer)

## Support

- **Spamidate Documentation**: https://docs.spamidate.com
- **Spamidate Support**: Email hello@techflunkylabs.com with "Spamidate" in subject
- **TechFlunky Labs**: hello@techflunkylabs.com
