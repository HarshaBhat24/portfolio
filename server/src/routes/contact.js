const express = require('express')
const { sendContactEmail } = require('../services/emailService')
const { validateContactForm } = require('../utils/validation')

const router = express.Router()

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    // Validate input
    const { error, value } = validateContactForm(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      })
    }

    const { name, email, message } = value

    // Log the contact attempt
    console.log('=== NEW CONTACT FORM SUBMISSION ===')
    console.log(`Name: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Message: ${message}`)
    console.log(`IP: ${req.ip}`)
    console.log(`Timestamp: ${new Date().toISOString()}`)
    console.log('=====================================')

    // Send email
    try {
      await sendContactEmail({ name, email, message })
      
      res.json({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      
      // Still return success to user, but log the error
      res.json({
        success: true,
        message: 'Message received! I\'ll get back to you soon.',
        note: 'Email delivery may be delayed'
      })
    }

  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    })
  }
})

// GET /api/contact/health
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Contact API',
    timestamp: new Date().toISOString()
  })
})

module.exports = router
