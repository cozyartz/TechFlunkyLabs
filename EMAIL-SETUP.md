# Email Setup Guide

This project uses the centralized Email API service for sending emails from `noreply@techflunkylabs.com`.

## Quick Start

### 1. Set Up Environment Variables

**For Local Development:**
```bash
# Copy the example file
cp .dev.vars.example .dev.vars

# The file already contains the correct API key
# EMAIL_API_KEY=a3358de48a02eb70f3d112aa6bb42b69f57ba28ea3d5278e6af48db1201bea8f
```

**For Cloudflare Pages Deployment:**
```bash
# Set the environment variable (run once)
npx wrangler pages secret put EMAIL_API_KEY
# When prompted, paste: a3358de48a02eb70f3d112aa6bb42b69f57ba28ea3d5278e6af48db1201bea8f
```

Or set it in the Cloudflare dashboard:
1. Go to Workers & Pages > tflabs > Settings > Environment Variables
2. Add variable: `EMAIL_API_KEY` = `a3358de48a02eb70f3d112aa6bb42b69f57ba28ea3d5278e6af48db1201bea8f`

## Usage

### Option 1: Using the Email API Endpoint (Recommended)

Send emails from client-side code via the API endpoint:

```typescript
// Example: Contact form submission
const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: 'user@example.com',
    subject: 'Contact Form Submission',
    html: '<p>Your message here</p>',
    from: 'noreply@techflunkylabs.com',
    fromName: 'TechFlunky Labs',
  }),
});

const result = await response.json();
if (result.success) {
  console.log('Email sent successfully!');
}
```

### Option 2: Using the Email Utility Directly (Server-side only)

Import and use the email utility in server-side code (API routes, SSR pages):

```typescript
import { sendEmail, sendWelcomeEmail, sendContactFormEmail } from '../lib/email';

// Basic email
const result = await sendEmail({
  to: 'user@example.com',
  subject: 'Hello from TechFlunky Labs',
  html: '<h1>Hello!</h1><p>This is a test email.</p>',
}, import.meta.env.EMAIL_API_KEY);

// Welcome email (pre-built template)
await sendWelcomeEmail(
  'newuser@example.com',
  'John Doe',
  import.meta.env.EMAIL_API_KEY
);

// Contact form email (pre-built template)
await sendContactFormEmail({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'I have a question...',
}, import.meta.env.EMAIL_API_KEY);
```

## Available Email Templates

All templates feature TechFlunky Labs' signature black & electric yellow aesthetic with:
- Space Grotesk typography
- Electric yellow (#e0ff00) accents and glow effects
- Dark mode design (black background)
- Responsive mobile-friendly layouts
- Rounded corners and modern styling

### 1. `sendWelcomeEmail(userEmail, userName, apiKey)`
Sends a branded welcome email to new users with getting started tips.

**Example:**
```typescript
await sendWelcomeEmail(
  'user@example.com',
  'Jane Doe',
  import.meta.env.EMAIL_API_KEY
);
```

### 2. `sendBlogPostEmail(subscribers, blogPost, apiKey)`
Notify subscribers when a new blog post is published.

**Example:**
```typescript
await sendBlogPostEmail(
  ['subscriber1@example.com', 'subscriber2@example.com'],
  {
    title: 'Building Edge-First Applications',
    excerpt: 'Learn how to build lightning-fast applications using Cloudflare Workers...',
    url: 'https://techflunkylabs.com/blog/edge-first-apps',
    imageUrl: 'https://example.com/post-image.jpg', // optional
    author: 'Tech Flunky Team',
    publishDate: 'January 15, 2024'
  },
  import.meta.env.EMAIL_API_KEY
);
```

### 3. `sendNewsletterEmail(subscribers, newsletter, apiKey)`
Send a multi-section newsletter with custom content blocks.

**Example:**
```typescript
await sendNewsletterEmail(
  ['subscriber@example.com'],
  {
    subject: 'January 2024 Update',
    heading: 'What We\'ve Been Building This Month',
    content: [
      {
        title: 'New Feature: AI Code Reviews',
        description: 'We launched automated code reviews powered by Claude AI...',
        url: 'https://techflunkylabs.com/features/ai-reviews',
        buttonText: 'Learn More'
      },
      {
        title: 'Performance Improvements',
        description: 'Our edge infrastructure now delivers 40% faster response times...'
      }
    ]
  },
  import.meta.env.EMAIL_API_KEY
);
```

### 4. `sendPasswordResetEmail(userEmail, resetUrl, apiKey)`
Secure password reset emails with time-limited links.

**Example:**
```typescript
await sendPasswordResetEmail(
  'user@example.com',
  'https://techflunkylabs.com/reset-password?token=abc123',
  import.meta.env.EMAIL_API_KEY
);
```

### 5. `sendAccountNotificationEmail(userEmail, notification, apiKey)`
General account notifications and updates.

**Example:**
```typescript
await sendAccountNotificationEmail(
  'user@example.com',
  {
    title: 'Your Deployment Succeeded',
    message: 'Your application has been successfully deployed to production and is now live.',
    actionUrl: 'https://techflunkylabs.com/deployments/123',
    actionText: 'View Deployment'
  },
  import.meta.env.EMAIL_API_KEY
);
```

### 6. `sendContactFormEmail(data, apiKey)`
Internal notification when someone submits the contact form.

**Example:**
```typescript
await sendContactFormEmail(
  {
    name: 'John Smith',
    email: 'john@example.com',
    message: 'I\'m interested in your services...'
  },
  import.meta.env.EMAIL_API_KEY
);
```

### 7. `sendEmail(options, apiKey)`
Custom emails with full control over HTML content.

## Email Configuration

- **From Address**: `noreply@techflunkylabs.com`
- **From Name**: `TechFlunky Labs` (customizable)
- **SMTP Provider**: PurelyMail (handled by Email API)
- **API Endpoint**: `https://mail-api.techflunky.com`

## Security Notes

- ✅ API key is stored securely in environment variables
- ✅ Never commit `.dev.vars` to git (already in .gitignore)
- ✅ Rate limiting: 50 emails per minute per IP
- ✅ Email validation and sanitization built-in
- ✅ Only sends from approved `techflunkylabs.com` domain

## Template Preview

To preview how the email templates look before sending:

```bash
# Open the preview file in your browser
open email-preview.html
# or on Linux: xdg-open email-preview.html
# or on Windows: start email-preview.html
```

This will show you interactive previews of all email templates with the TechFlunky Labs branding.

## Testing

Test the email API locally:

```bash
# Start dev server
npm run dev

# Send a test welcome email
curl -X POST http://localhost:4321/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "⚡ Welcome to TechFlunky Labs",
    "html": "<h1>Test Email</h1><p>This is a test.</p>"
  }'
```

### Test Individual Templates

```typescript
// Test welcome email
import { sendWelcomeEmail } from './lib/email';

await sendWelcomeEmail(
  'your-email@example.com',
  'Your Name',
  import.meta.env.EMAIL_API_KEY
);

// Test blog post notification
import { sendBlogPostEmail } from './lib/email';

await sendBlogPostEmail(
  ['your-email@example.com'],
  {
    title: 'Test Blog Post',
    excerpt: 'This is a test blog post...',
    url: 'https://techflunkylabs.com/blog/test',
    author: 'Test Author',
    publishDate: new Date().toLocaleDateString()
  },
  import.meta.env.EMAIL_API_KEY
);
```

## Troubleshooting

### "Email service not configured" error
- Make sure `.dev.vars` exists with `EMAIL_API_KEY` set
- For production, ensure the environment variable is set in Cloudflare Pages settings

### "Domain not allowed" error
- The email API only allows sending from `techflunkylabs.com`
- Make sure the `from` address uses this domain

### Rate limit exceeded
- The API limits to 50 emails per minute per IP
- Implement client-side rate limiting or use a queue for bulk emails

## Examples

### Contact Form Component (React)

```tsx
import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'support@techflunkylabs.com',
        subject: `Contact from ${formData.get('name')}`,
        html: `
          <p><strong>Name:</strong> ${formData.get('name')}</p>
          <p><strong>Email:</strong> ${formData.get('email')}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.get('message')}</p>
        `,
        replyTo: formData.get('email') as string,
      }),
    });

    if (response.ok) {
      setStatus('Email sent successfully!');
    } else {
      setStatus('Failed to send email.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Your Name" required />
      <input name="email" type="email" placeholder="your@email.com" required />
      <textarea name="message" placeholder="Your message" required />
      <button type="submit">Send</button>
      {status && <p>{status}</p>}
    </form>
  );
}
```

## Support

For email API issues:
- Check VM logs: `ssh vm "docker logs email-api --tail 50"`
- Email API documentation: `/Users/cozart-lundin/code/VM/EMAIL-API.md`
- VM Email API location: `172.245.190.153:3002`
