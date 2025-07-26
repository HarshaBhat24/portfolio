# Contact Form Setup Guide

The contact form has been implemented with multiple email service options. Here's how to set it up:

## Quick Start (No Email Service)

The form will work immediately without any setup - messages will be logged to the console. This is useful for development and testing.

## Email Service Options

### Option 1: Resend (Recommended for Production)

Resend is a modern email API that works great with serverless functions.

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add to your `.env.local`:
```bash
RESEND_API_KEY=your_resend_api_key_here
```
4. Install the package:
```bash
npm install resend
```

### Option 2: Gmail (Good for Personal Projects)

1. Enable 2-factor authentication on your Gmail account
2. Generate an app password: [Google Support Guide](https://support.google.com/accounts/answer/185833)
3. Add to your `.env.local`:
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```
4. Update the API route to use the `/api/contact` endpoint in `Contact.tsx`

### Option 3: Other Services

The code can be easily adapted for:
- SendGrid
- Mailgun
- AWS SES
- Any SMTP provider

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

## Testing

1. Start the development server:
```bash
npm run dev
```

2. Navigate to the contact section
3. Fill out and submit the form
4. Check the console logs or your email (depending on configuration)

## Production Deployment

- Ensure environment variables are set in your hosting platform
- For Vercel: Add environment variables in the project settings
- For Netlify: Add them in the site settings
- For other platforms: Follow their environment variable documentation

## Troubleshooting

- **Form submits but no email received**: Check environment variables and console logs
- **"Module not found" errors**: Make sure you've installed the required packages
- **CORS errors**: The API routes are configured for same-origin requests only
- **Rate limiting**: Consider adding rate limiting for production use

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords instead of real passwords for Gmail
- Consider adding CAPTCHA for production use
- Implement rate limiting to prevent spam
