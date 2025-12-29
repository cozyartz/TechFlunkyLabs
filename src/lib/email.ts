/**
 * Email utility for TechFlunky Labs
 * Uses the centralized Email API service
 */

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  fromName?: string;
  replyTo?: string;
}

export interface EmailResponse {
  success: boolean;
  error?: string;
}

/**
 * Send an email via the Email API service
 *
 * @param options - Email configuration
 * @param apiKey - Email API key (from environment variables)
 * @returns Promise with success status
 *
 * @example
 * ```ts
 * const result = await sendEmail({
 *   to: 'user@example.com',
 *   subject: 'Welcome to TechFlunky Labs',
 *   html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
 *   from: 'noreply@techflunkylabs.com',
 *   fromName: 'TechFlunky Labs'
 * }, process.env.EMAIL_API_KEY);
 * ```
 */
export async function sendEmail(
  options: EmailOptions,
  apiKey: string
): Promise<EmailResponse> {
  try {
    const response = await fetch('https://mail-api.techflunky.com/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: options.to,
        subject: options.subject,
        html: options.html,
        from: options.from || 'noreply@techflunkylabs.com',
        fromName: options.fromName || 'TechFlunky Labs',
        replyTo: options.replyTo,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      return {
        success: false,
        error: error.error || `HTTP ${response.status}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

/**
 * Send a welcome email to a new user
 */
export async function sendWelcomeEmail(
  userEmail: string,
  userName: string,
  apiKey: string
): Promise<EmailResponse> {
  return sendEmail({
    to: userEmail,
    subject: '⚡ Welcome to TechFlunky Labs',
    html: getWelcomeEmailTemplate(userName),
    from: 'noreply@techflunkylabs.com',
    fromName: 'TechFlunky Labs',
  }, apiKey);
}

/**
 * Send a contact form notification email
 */
export async function sendContactFormEmail(
  data: {
    name: string;
    email: string;
    message: string;
  },
  apiKey: string
): Promise<EmailResponse> {
  return sendEmail({
    to: 'support@techflunkylabs.com',
    subject: `⚡ New Contact from ${data.name}`,
    html: getContactFormTemplate(data),
    from: 'noreply@techflunkylabs.com',
    fromName: 'TechFlunky Labs Contact Form',
    replyTo: data.email,
  }, apiKey);
}

/**
 * Send a blog post notification email
 */
export async function sendBlogPostEmail(
  subscribers: string[],
  blogPost: {
    title: string;
    excerpt: string;
    url: string;
    imageUrl?: string;
    author: string;
    publishDate: string;
  },
  apiKey: string
): Promise<EmailResponse> {
  return sendEmail({
    to: subscribers,
    subject: `⚡ New Post: ${blogPost.title}`,
    html: getBlogPostTemplate(blogPost),
    from: 'noreply@techflunkylabs.com',
    fromName: 'TechFlunky Labs Blog',
  }, apiKey);
}

/**
 * Send a newsletter email
 */
export async function sendNewsletterEmail(
  subscribers: string[],
  newsletter: {
    subject: string;
    heading: string;
    content: Array<{
      title: string;
      description: string;
      url?: string;
      buttonText?: string;
    }>;
  },
  apiKey: string
): Promise<EmailResponse> {
  return sendEmail({
    to: subscribers,
    subject: `⚡ ${newsletter.subject}`,
    html: getNewsletterTemplate(newsletter),
    from: 'noreply@techflunkylabs.com',
    fromName: 'TechFlunky Labs',
  }, apiKey);
}

/**
 * Send a password reset email
 */
export async function sendPasswordResetEmail(
  userEmail: string,
  resetUrl: string,
  apiKey: string
): Promise<EmailResponse> {
  return sendEmail({
    to: userEmail,
    subject: '🔐 Reset Your Password',
    html: getPasswordResetTemplate(resetUrl),
    from: 'noreply@techflunkylabs.com',
    fromName: 'TechFlunky Labs Security',
  }, apiKey);
}

/**
 * Send an account notification email
 */
export async function sendAccountNotificationEmail(
  userEmail: string,
  notification: {
    title: string;
    message: string;
    actionUrl?: string;
    actionText?: string;
  },
  apiKey: string
): Promise<EmailResponse> {
  return sendEmail({
    to: userEmail,
    subject: `⚡ ${notification.title}`,
    html: getAccountNotificationTemplate(notification),
    from: 'noreply@techflunkylabs.com',
    fromName: 'TechFlunky Labs',
  }, apiKey);
}

// ============================================================================
// EMAIL TEMPLATES
// ============================================================================

/**
 * Base email layout wrapper
 */
function getBaseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>TechFlunky Labs</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      background-color: #000000;
      color: #f4f4f5;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .email-wrapper {
      width: 100%;
      background-color: #000000;
      padding: 40px 20px;
    }

    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #0d0d0d;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #1a1a1a;
    }

    .email-header {
      background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
      padding: 32px 40px;
      text-align: center;
      border-bottom: 2px solid #e0ff00;
    }

    .logo {
      font-size: 32px;
      font-weight: 700;
      color: #e0ff00;
      text-decoration: none;
      display: inline-block;
      letter-spacing: -1px;
      text-shadow: 0 0 20px rgba(224, 255, 0, 0.5);
    }

    .logo-subtext {
      font-size: 12px;
      color: #a1a1aa;
      margin-top: 4px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .email-body {
      padding: 40px;
    }

    .email-footer {
      background: #000000;
      padding: 32px 40px;
      text-align: center;
      border-top: 1px solid #1a1a1a;
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
      color: #f4f4f5;
      margin-bottom: 16px;
      line-height: 1.2;
    }

    h2 {
      font-size: 22px;
      font-weight: 600;
      color: #f4f4f5;
      margin-bottom: 12px;
      line-height: 1.3;
    }

    p {
      font-size: 16px;
      color: #d4d4d8;
      margin-bottom: 16px;
    }

    a {
      color: #e0ff00;
      text-decoration: none;
    }

    a:hover {
      color: #f0ff4d;
    }

    .button {
      display: inline-block;
      padding: 14px 32px;
      background-color: #e0ff00;
      color: #000000 !important;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      margin: 16px 0;
      transition: all 0.3s ease;
      box-shadow: 0 0 20px rgba(224, 255, 0, 0.3);
    }

    .button:hover {
      background-color: #f0ff4d;
      box-shadow: 0 0 30px rgba(224, 255, 0, 0.5);
      transform: translateY(-2px);
    }

    .button-secondary {
      background-color: #1a1a1a;
      color: #e0ff00 !important;
      border: 1px solid #e0ff00;
      box-shadow: none;
    }

    .button-secondary:hover {
      background-color: #2a2a2a;
      border-color: #f0ff4d;
    }

    .card {
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      border-radius: 12px;
      padding: 24px;
      margin: 20px 0;
    }

    .highlight {
      background: linear-gradient(135deg, rgba(224, 255, 0, 0.1), rgba(224, 255, 0, 0.05));
      border-left: 3px solid #e0ff00;
      padding: 16px;
      border-radius: 8px;
      margin: 20px 0;
    }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #2a2a2a, transparent);
      margin: 32px 0;
    }

    .footer-links {
      margin: 20px 0;
    }

    .footer-links a {
      color: #a1a1aa;
      font-size: 14px;
      margin: 0 12px;
      text-decoration: none;
    }

    .footer-links a:hover {
      color: #e0ff00;
    }

    .footer-text {
      font-size: 12px;
      color: #71717a;
      line-height: 1.5;
    }

    .social-links {
      margin: 20px 0;
    }

    .social-links a {
      display: inline-block;
      margin: 0 8px;
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }

    .social-links a:hover {
      opacity: 1;
    }

    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 20px 10px;
      }

      .email-header,
      .email-body,
      .email-footer {
        padding: 24px 20px;
      }

      h1 {
        font-size: 24px;
      }

      h2 {
        font-size: 20px;
      }

      .button {
        display: block;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">
      <!-- Header -->
      <div class="email-header">
        <a href="https://techflunkylabs.com" class="logo">TF</a>
        <div class="logo-subtext">Tech Flunky Labs</div>
      </div>

      <!-- Body -->
      <div class="email-body">
        ${content}
      </div>

      <!-- Footer -->
      <div class="email-footer">
        <div class="footer-links">
          <a href="https://techflunkylabs.com">Website</a>
          <a href="https://techflunkylabs.com/blog">Blog</a>
          <a href="https://techflunkylabs.com/contact">Contact</a>
        </div>

        <div class="divider"></div>

        <div class="footer-text">
          <p>© ${new Date().getFullYear()} TechFlunky Labs. All rights reserved.</p>
          <p style="margin-top: 8px;">
            AI-Powered Development & Edge-First Infrastructure
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Welcome email template
 */
function getWelcomeEmailTemplate(userName: string): string {
  const content = `
    <h1>Welcome to TechFlunky Labs, ${userName}! ⚡</h1>

    <p>We're excited to have you join our community of builders, makers, and tech enthusiasts.</p>

    <div class="card">
      <h2>What's Next?</h2>
      <p style="margin-bottom: 12px;">Here are some things you can do to get started:</p>
      <ul style="color: #d4d4d8; margin-left: 20px; margin-bottom: 0;">
        <li style="margin-bottom: 8px;">Explore our latest blog posts and insights</li>
        <li style="margin-bottom: 8px;">Check out our open-source projects</li>
        <li style="margin-bottom: 8px;">Connect with us on social media</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 32px 0;">
      <a href="https://techflunkylabs.com/blog" class="button">Read Our Blog</a>
    </div>

    <div class="highlight">
      <p style="margin-bottom: 8px;"><strong>Need help?</strong></p>
      <p style="margin-bottom: 0;">Our team is here to help. Just reply to this email or reach out through our contact page.</p>
    </div>

    <p style="margin-top: 32px;">Happy building! 🚀</p>
    <p style="margin-bottom: 0;"><strong>The TechFlunky Labs Team</strong></p>
  `;

  return getBaseTemplate(content);
}

/**
 * Blog post notification template
 */
function getBlogPostTemplate(blogPost: {
  title: string;
  excerpt: string;
  url: string;
  imageUrl?: string;
  author: string;
  publishDate: string;
}): string {
  const imageHtml = blogPost.imageUrl
    ? `<img src="${blogPost.imageUrl}" alt="${blogPost.title}" style="width: 100%; border-radius: 12px; margin-bottom: 20px;">`
    : '';

  const content = `
    <h1>New Blog Post Published ⚡</h1>

    <p>We just published a new post that we think you'll find interesting:</p>

    <div class="card">
      ${imageHtml}
      <h2>${blogPost.title}</h2>
      <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 16px;">
        By ${blogPost.author} • ${blogPost.publishDate}
      </p>
      <p>${blogPost.excerpt}</p>

      <div style="margin-top: 24px;">
        <a href="${blogPost.url}" class="button">Read Full Post</a>
      </div>
    </div>

    <div class="divider"></div>

    <p style="font-size: 14px; color: #a1a1aa; margin-bottom: 0;">
      You're receiving this because you subscribed to TechFlunky Labs updates.
      <a href="https://techflunkylabs.com/unsubscribe" style="color: #a1a1aa; text-decoration: underline;">Unsubscribe</a>
    </p>
  `;

  return getBaseTemplate(content);
}

/**
 * Newsletter template
 */
function getNewsletterTemplate(newsletter: {
  heading: string;
  content: Array<{
    title: string;
    description: string;
    url?: string;
    buttonText?: string;
  }>;
}): string {
  const contentHtml = newsletter.content.map(item => {
    const buttonHtml = item.url
      ? `<div style="margin-top: 16px;"><a href="${item.url}" class="button-secondary">${item.buttonText || 'Learn More'}</a></div>`
      : '';

    return `
      <div class="card">
        <h2>${item.title}</h2>
        <p style="margin-bottom: 0;">${item.description}</p>
        ${buttonHtml}
      </div>
    `;
  }).join('');

  const content = `
    <h1>${newsletter.heading}</h1>

    ${contentHtml}

    <div class="divider"></div>

    <p style="text-align: center; margin-bottom: 0;">
      <a href="https://techflunkylabs.com" class="button">Visit Our Website</a>
    </p>

    <p style="font-size: 14px; color: #a1a1aa; text-align: center; margin-top: 32px; margin-bottom: 0;">
      You're receiving this because you subscribed to TechFlunky Labs updates.
      <a href="https://techflunkylabs.com/unsubscribe" style="color: #a1a1aa; text-decoration: underline;">Unsubscribe</a>
    </p>
  `;

  return getBaseTemplate(content);
}

/**
 * Password reset template
 */
function getPasswordResetTemplate(resetUrl: string): string {
  const content = `
    <h1>Reset Your Password 🔐</h1>

    <p>We received a request to reset your password. Click the button below to create a new password:</p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${resetUrl}" class="button">Reset Password</a>
    </div>

    <div class="highlight">
      <p style="margin-bottom: 8px;"><strong>⚠️ Security Notice</strong></p>
      <p style="margin-bottom: 0;">This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
    </div>

    <p style="margin-top: 32px; font-size: 14px; color: #a1a1aa;">
      For security reasons, we cannot send your existing password. If you need help, contact our support team.
    </p>

    <div class="divider"></div>

    <p style="font-size: 12px; color: #71717a; margin-bottom: 0;">
      If the button doesn't work, copy and paste this link into your browser:<br>
      <a href="${resetUrl}" style="color: #71717a; word-break: break-all;">${resetUrl}</a>
    </p>
  `;

  return getBaseTemplate(content);
}

/**
 * Account notification template
 */
function getAccountNotificationTemplate(notification: {
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
}): string {
  const actionHtml = notification.actionUrl
    ? `
      <div style="text-align: center; margin: 32px 0;">
        <a href="${notification.actionUrl}" class="button">${notification.actionText || 'View Details'}</a>
      </div>
    `
    : '';

  const content = `
    <h1>${notification.title}</h1>

    <p>${notification.message}</p>

    ${actionHtml}

    <div class="divider"></div>

    <p style="font-size: 14px; color: #a1a1aa; margin-bottom: 0;">
      This is an automated notification from TechFlunky Labs. If you have questions, please contact our support team.
    </p>
  `;

  return getBaseTemplate(content);
}

/**
 * Contact form internal notification template
 */
function getContactFormTemplate(data: {
  name: string;
  email: string;
  message: string;
}): string {
  const content = `
    <h1>New Contact Form Submission ⚡</h1>

    <div class="card">
      <p><strong>Name:</strong></p>
      <p style="margin-bottom: 16px;">${data.name}</p>

      <p><strong>Email:</strong></p>
      <p style="margin-bottom: 16px;">
        <a href="mailto:${data.email}">${data.email}</a>
      </p>

      <p><strong>Message:</strong></p>
      <div class="highlight">
        <p style="margin-bottom: 0; white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>

    <div style="text-align: center; margin: 32px 0;">
      <a href="mailto:${data.email}?subject=Re: Your inquiry to TechFlunky Labs" class="button">Reply to ${data.name}</a>
    </div>
  `;

  return getBaseTemplate(content);
}
