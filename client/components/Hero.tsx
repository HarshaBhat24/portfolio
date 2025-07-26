'use client'

import { motion } from 'framer-motion'
import { Shield, Code, Terminal, Github, Linkedin, Mail } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-primary-700/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="gradient-text">S Harsha Bhat</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Cybersecurity Enthusiast & Full-Stack Developer
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Student passionate about cybersecurity, CTF competitions, and building innovative web applications
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center space-x-6 mb-12"
          >
            <a
              href="https://github.com/HarshaBhat24"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-effect rounded-full hover:bg-primary-500/20 transition-all duration-300 hover:animate-glow"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/s-harsha-bhat/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-effect rounded-full hover:bg-primary-500/20 transition-all duration-300 hover:animate-glow"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:harshabhat666@gmail.com"
              className="p-3 glass-effect rounded-full hover:bg-primary-500/20 transition-all duration-300 hover:animate-glow"
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold transition-colors duration-300 hover:animate-glow"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 glass-effect cyber-border rounded-lg font-semibold transition-all duration-300"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-500 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
