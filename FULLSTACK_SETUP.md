# Portfolio Project - Full Stack Setup

This portfolio project now has a **separate frontend and backend architecture**:

- **Frontend**: Next.js application (`/client` directory)
- **Backend**: Express.js server (`/server` directory)

## 🚀 Quick Start

### 1. Start Both Servers

**Terminal 1 - Frontend (Next.js)**:
```bash
cd client
npm run dev
# Runs on http://localhost:3000
```

**Terminal 2 - Backend (Express.js)**:
```bash
cd server
npm run dev  
# Runs on http://localhost:5000
```

### 2. VS Code Tasks (Alternative)

Use VS Code's built-in task runner:
- `Ctrl+Shift+P` → "Tasks: Run Task"
- Select "Portfolio Dev Server" (frontend)
- Select "Portfolio Backend Server" (backend)

## 📁 Project Structure

```
portfolio/
├── client/                    # Next.js Frontend
│   ├── app/
│   │   ├── api/              # (Legacy API routes - now unused)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Contact.tsx       # Updated to use backend API
│   │   ├── Projects.tsx
│   │   └── ...
│   ├── package.json
│   └── .env.local
│
├── server/                    # Express.js Backend
│   ├── src/
│   │   ├── index.js          # Main server file
│   │   ├── routes/
│   │   │   └── contact.js    # Contact form API
│   │   ├── services/
│   │   │   └── emailService.js # Email handling
│   │   ├── middleware/
│   │   │   └── errorMiddleware.js
│   │   └── utils/
│   │       └── validation.js # Input validation
│   ├── package.json
│   ├── .env                  # Server environment variables
│   └── README.md
│
└── .vscode/
    └── tasks.json            # VS Code tasks for both servers
```

## 🔧 Configuration

### Frontend (.env.local)
The frontend no longer needs email configuration since it uses the backend API.

### Backend (.env)
```bash
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=harshabhat666@gmail.com
```

## 📡 API Endpoints

### Backend Server (http://localhost:5000)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Server health check |
| `/api/contact` | POST | Submit contact form |
| `/api/contact/health` | GET | Contact API health |

### Contact Form API
```bash
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com", 
  "message": "Hello, this is a test message."
}
```

## 🛡️ Security Features

- **CORS**: Configured for frontend-backend communication
- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Validation**: Joi schema validation
- **Helmet**: Security headers
- **Error Handling**: Secure error responses

## 📧 Email Services

The backend supports multiple email providers:

1. **Resend** (Recommended - Already configured)
2. **Gmail** with app passwords
3. **SendGrid**

## 🔄 Development Workflow

1. **Start both servers** (frontend + backend)
2. **Frontend** connects to backend API automatically
3. **Hot reload** works for both applications
4. **Environment variables** are separated by application

## 🚀 Deployment Options

### Frontend (Next.js)
- **Vercel** (Recommended)
- **Netlify**
- **DigitalOcean App Platform**

### Backend (Express.js)
- **Railway** (Recommended)
- **Vercel Serverless Functions**
- **DigitalOcean App Platform**
- **AWS/Google Cloud**

### Environment Variables for Production

**Frontend** (if using API calls):
```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

**Backend**:
```bash
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
RESEND_API_KEY=your_production_api_key
CONTACT_EMAIL=your-email@domain.com
```

## 🧪 Testing the Contact Form

1. Ensure both servers are running
2. Navigate to http://localhost:3000
3. Scroll to contact section
4. Fill out and submit form
5. Check backend server logs for submission
6. Check email inbox (if email service configured)

## 📝 Recent Changes

- ✅ Separated frontend and backend into different directories
- ✅ Created standalone Express.js server with proper middleware
- ✅ Updated Contact component to use backend API
- ✅ Added comprehensive error handling and validation
- ✅ Implemented rate limiting and security features
- ✅ Configured CORS for cross-origin requests
- ✅ Added VS Code tasks for easy development

## 🔧 Troubleshooting

### CORS Issues
- Ensure `CLIENT_URL` in backend `.env` matches frontend URL
- Check browser console for CORS errors

### Connection Refused
- Verify backend server is running on port 5000
- Check frontend is making requests to correct URL

### Email Not Sending
- Verify `RESEND_API_KEY` is correctly set
- Check backend server logs for email errors

### Rate Limiting
- Wait 15 minutes if rate limited
- Clear browser cache if needed
