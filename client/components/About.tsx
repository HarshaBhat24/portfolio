'use client'

import { motion } from 'framer-motion'
import { User, GraduationCap, Target } from 'lucide-react'

const About = () => {
  return (
    <section id="about" className="py-20 bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Learn more about my journey in cybersecurity and web development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-effect p-6 rounded-lg cyber-border"
          >
            <User className="h-12 w-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Who I Am</h3>
            <p className="text-gray-400">
              I&apos;m S Harsha Bhat, a passionate student with a deep interest in cybersecurity 
              and full-stack web development. I love solving complex problems and building 
              innovative solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-effect p-6 rounded-lg cyber-border"
          >
            <GraduationCap className="h-12 w-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Education & Learning</h3>
            <p className="text-gray-400">
              Currently pursuing my studies while actively participating in CTF competitions 
              and building real-world projects. I believe in continuous learning and 
              hands-on experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="glass-effect p-6 rounded-lg cyber-border"
          >
            <Target className="h-12 w-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Goals & Vision</h3>
            <p className="text-gray-400">
              My goal is to become a cybersecurity expert while maintaining strong 
              development skills. I aim to contribute to making the digital world 
              more secure through innovative solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
