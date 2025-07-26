const Joi = require('joi')

// Contact form validation schema
const contactFormSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name must not exceed 100 characters',
      'any.required': 'Name is required'
    }),
  
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  
  message: Joi.string()
    .trim()
    .min(10)
    .max(2000)
    .required()
    .messages({
      'string.min': 'Message must be at least 10 characters long',
      'string.max': 'Message must not exceed 2000 characters',
      'any.required': 'Message is required'
    })
})

// Validate contact form data
function validateContactForm(data) {
  return contactFormSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  })
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
}

// Validate email format (additional check)
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

module.exports = {
  validateContactForm,
  sanitizeInput,
  isValidEmail,
  contactFormSchema
}
