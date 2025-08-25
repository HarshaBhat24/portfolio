'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Code } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'CipherCrack – Offline CLI Crypto Toolkit',
      description: 'A command-line cryptographic toolkit developed in Python to streamline encryption and decryption of common CTF ciphers. Features modular scripts with argparse CLI automation for enhanced workflow efficiency.',
      technologies: ['Python', 'Argparse', 'Cryptography', 'CLI'],
      github: 'https://github.com/HarshaBhat24/CipherCrack',
      demo: null,
      image: '/api/placeholder/400/250'
    },
    {
      title: 'VigiLynx - Phishing & Malware Detector',
      description: 'Full-stack cybersecurity solution with React.js dashboard and Chrome extension for real-time malicious URL and file detection. Track Champion winner at HackAthena\'25.',
      technologies: ['React.js', 'JavaScript', 'Node.js', 'Supabase', 'Chrome Extension'],
      github: 'https://github.com/HarshaBhat24/Vigilynx-Web',
      demo: 'https://vigilynx-web.vercel.app/',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'BodyBuddy - Workout Posture Detector',
      description: 'CLI-based workout posture analysis tool using computer vision to track joint angles, count reps, and provide real-time accuracy metrics for 5 exercise types including push-ups, squats, and planks.',
      technologies: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision'],
      github: 'https://github.com/HarshaBhat24/BodyBuddy',
      demo: null,
      image: '/api/placeholder/400/250'
    },
    {
      title: 'CricGeek – Cricket Scorecard Web App',
      description: 'Cricket scorecard web application featuring live scores, player statistics, and real-time match data integration. Built with Firebase backend and CricAPI for live data synchronization.',
      technologies: ['React.js', 'CSS', 'Firebase', 'CricAPI', 'JavaScript'],
      github: 'https://github.com/HarshaBhat24/CRICGEEK',
      demo: null,
      image: '/api/placeholder/400/250'
    }
  ]

  return (
    <section id="projects" className="py-20 bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my work in cybersecurity and web development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-lg overflow-hidden cyber-border hover:bg-primary-500/5 transition-all duration-300"
              style={{ userSelect: 'text' }}
            >
              <div className="h-48 bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center">
                <Code className="h-16 w-16 text-primary-400" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-dark-700 hover:bg-primary-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200 no-underline"
                  >
                    <Github className="h-4 w-4" />
                    <span>Code</span>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 no-underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
