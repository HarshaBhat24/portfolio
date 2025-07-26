const { Resend } = require('resend')
const nodemailer = require('nodemailer')

// Initialize email services
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Gmail transporter setup
const gmailTransporter = process.env.EMAIL_USER && process.env.EMAIL_PASS 
  ? nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  : null

// Create HTML email template
function createEmailTemplate(data) {
  return `
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Contact</h1>
    </div>
    <div style="padding: 30px; background: #f9f9f9;">
      <h2 style="color: #333; margin-bottom: 20px;">Message Details</h2>
      
      <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${data.name}</p>
        <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${data.email}</p>
        <p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${data.subject}</p>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #333;">Message:</h3>
        <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
      </div>
      
      <p style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-left: 4px solid #3498db; font-style: italic;">
        💡 You can reply directly to this email to respond to ${data.name}
      </p>
    </div>
  </div>
`
}

// Send email with Resend
async function sendEmailWithResend(data) {
  if (!resend) {
    throw new Error('Resend not configured')
  }

  try {
    const response = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'bharsha12121@gmail.com'],
      subject: `Portfolio Contact: Message from ${data.name}`,
      html: createEmailTemplate(data),
      replyTo: data.email,
    })

    console.log('Resend API response:', response)

    if (response.error) {
      console.error('Resend error details:', response.error)
      throw new Error(`Resend error: ${response.error.message || JSON.stringify(response.error)}`)
    }

    if (!response.data) {
      console.error('Resend returned no data:', response)
      throw new Error('Resend returned no data')
    }

    return response.data
  } catch (error) {
    console.error('Resend API call failed:', error)
    throw error
  }
}

// Send email with Gmail
async function sendEmailWithGmail(data) {
  if (!gmailTransporter) {
    throw new Error('Gmail not configured')
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL || 'harshabhat666@gmail.com',
    subject: `Portfolio Contact: Message from ${data.name}`,
    html: createEmailTemplate(data),
    replyTo: data.email,
  }

  return await gmailTransporter.sendMail(mailOptions)
}

// Send email with SendGrid
async function sendEmailWithSendGrid(data) {
  const sgMail = require('@sendgrid/mail')
  
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SendGrid not configured')
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: process.env.CONTACT_EMAIL || 'harshabhat666@gmail.com',
    from: 'your-verified-sender@yourdomain.com', // Must be verified with SendGrid
    subject: `Portfolio Contact: Message from ${data.name}`,
    html: createEmailTemplate(data),
    replyTo: data.email,
  }

  return await sgMail.send(msg)
}

// Main email sending function
async function sendContactEmail(data) {
  const errors = []

  // Try each configured email service
  if (process.env.RESEND_API_KEY) {
    try {
      const result = await sendEmailWithResend(data)
      console.log('✅ Email sent successfully with Resend:', result.id)
      return result
    } catch (error) {
      console.error('❌ Resend failed:', error.message)
      errors.push(`Resend: ${error.message}`)
    }
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const result = await sendEmailWithGmail(data)
      console.log('✅ Email sent successfully with Gmail:', result.messageId)
      return result
    } catch (error) {
      console.error('❌ Gmail failed:', error.message)
      errors.push(`Gmail: ${error.message}`)
    }
  }

  if (process.env.SENDGRID_API_KEY) {
    try {
      const result = await sendEmailWithSendGrid(data)
      console.log('✅ Email sent successfully with SendGrid')
      return result
    } catch (error) {
      console.error('❌ SendGrid failed:', error.message)
      errors.push(`SendGrid: ${error.message}`)
    }
  }

  // If no email service is configured or all failed
  if (errors.length > 0) {
    throw new Error(`All email services failed: ${errors.join(', ')}`)
  } else {
    console.log('⚠️ No email service configured - message logged only')
    return { message: 'No email service configured' }
  }
}

module.exports = {
  sendContactEmail,
  sendEmailWithResend,
  sendEmailWithGmail,
  sendEmailWithSendGrid
}
