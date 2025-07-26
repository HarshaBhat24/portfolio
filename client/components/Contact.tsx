'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, MessageCircle, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      console.log('Making request to backend...')
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Response received:', response.status, response.statusText)
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Message sent successfully! I\'ll get back to you soon.'
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.'
        })
      }
    } catch (error) {
      console.error('Network error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      })
    } finally {
      console.log('Form submission completed')
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    console.log(`Form field changed: ${name} = ${value}`)
    console.log('Event target:', e.target)
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleInputFocus = (fieldName: string) => {
    console.log(`Field focused: ${fieldName}`)
  }

  const handleInputBlur = (fieldName: string) => {
    console.log(`Field blurred: ${fieldName}`)
  }

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Let&apos;s connect! Whether you have a project idea, want to collaborate, or just want to chat about cybersecurity and tech.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let&apos;s Connect</h3>
              <p className="text-gray-400 mb-8">
                I&apos;m always interested in new opportunities, collaborations, and discussions about cybersecurity, 
                web development, and technology in general. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:harshabhat666@gmail.com"
                className="flex items-center space-x-4 p-4 glass-effect rounded-lg cyber-border hover:bg-primary-500/5 transition-all duration-300"
              >
                <Mail className="h-6 w-6 text-primary-500" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-400">harshabhat666@gmail.com</p>
                </div>
              </a>

              <a
                href="https://github.com/HarshaBhat24"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 glass-effect rounded-lg cyber-border hover:bg-primary-500/5 transition-all duration-300"
              >
                <Github className="h-6 w-6 text-primary-500" />
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-gray-400">@HarshaBhat24</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/s-harsha-bhat/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 glass-effect rounded-lg cyber-border hover:bg-primary-500/5 transition-all duration-300"
              >
                <Linkedin className="h-6 w-6 text-primary-500" />
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-gray-400">S Harsha Bhat</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect p-8 rounded-lg cyber-border"
          >
            <div className="flex items-center space-x-3 mb-6">
              <MessageCircle className="h-6 w-6 text-primary-500" />
              <h3 className="text-xl font-semibold">Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" style={{ position: 'relative', zIndex: 10 }}>
              {/* Status Message */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center space-x-2 p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <span className="text-sm">{submitStatus.message}</span>
                </motion.div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleInputFocus('name')}
                  onBlur={() => handleInputBlur('name')}
                  required
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#1f2937',
                    borderColor: '#4b5563',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #4b5563',
                    width: '100%',
                    fontSize: '16px'
                  }}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleInputFocus('email')}
                  onBlur={() => handleInputBlur('email')}
                  required
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#1f2937',
                    borderColor: '#4b5563',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #4b5563',
                    width: '100%',
                    fontSize: '16px'
                  }}
                  placeholder="your.email@example.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleInputFocus('message')}
                  onBlur={() => handleInputBlur('message')}
                  required
                  disabled={isSubmitting}
                  rows={5}
                  style={{
                    backgroundColor: '#1f2937',
                    borderColor: '#4b5563',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #4b5563',
                    width: '100%',
                    fontSize: '16px',
                    resize: 'none'
                  }}
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => console.log('Button clicked!')}
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
