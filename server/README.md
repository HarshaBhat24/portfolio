# Portfolio Server

A robust Express.js backend server for the portfolio website with email contact functionality.

## Features

- 🚀 Express.js server with modern middleware
- 📧 Multiple email service providers (Resend, Gmail, SendGrid)
- 🛡️ Security with Helmet and CORS
- 🚦 Rate limiting to prevent spam
- ✅ Input validation with Joi
- 📝 Comprehensive logging
- 🔄 Hot reload with nodemon

## Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Setup

Copy the environment template:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```bash
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Email Service (choose one)
RESEND_API_KEY=your_resend_api_key
# OR
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-app-password
# OR
# SENDGRID_API_KEY=your-sendgrid-api-key

# Contact Configuration
CONTACT_EMAIL=your-email@gmail.com
```

### 3. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and configuration info.

### Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is a test message."
}
```

### Contact Health Check
```
GET /api/contact/health
```
Returns contact API status.

## Email Service Configuration

### Option 1: Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Set `RESEND_API_KEY` in `.env`

### Option 2: Gmail

1. Enable 2FA on your Gmail account
2. Generate an app password
3. Set `EMAIL_USER` and `EMAIL_PASS` in `.env`

### Option 3: SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Set `SENDGRID_API_KEY` in `.env`
4. Verify your sender email with SendGrid

## Project Structure

```
server/
├── src/
│   ├── index.js                 # Main server file
│   ├── routes/
│   │   └── contact.js           # Contact form routes
│   ├── services/
│   │   └── emailService.js      # Email service logic
│   ├── middleware/
│   │   └── errorMiddleware.js   # Error handling
│   └── utils/
│       └── validation.js        # Input validation
├── package.json
├── .env.example
└── README.md
```

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configures cross-origin resource sharing
- **Rate Limiting**: Prevents spam (5 requests per 15 minutes)
- **Input Validation**: Validates and sanitizes all inputs
- **Error Handling**: Secure error responses

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run build` - No build step required for Node.js

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `CONTACT_EMAIL` | Email to receive messages | `harshabhat666@gmail.com` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `5` |

## Deployment

### Option 1: Vercel (Serverless)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the server directory
3. Set environment variables in Vercel dashboard

### Option 2: Railway
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Option 3: DigitalOcean App Platform
1. Create new app from GitHub
2. Configure environment variables
3. Deploy

## Troubleshooting

### Email Not Sending
- Check environment variables are set correctly
- Verify API keys are valid
- Check server logs for specific errors

### CORS Issues
- Ensure `CLIENT_URL` matches your frontend URL
- Check browser console for CORS errors

### Rate Limiting
- Wait 15 minutes if rate limited
- Check IP address in logs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
