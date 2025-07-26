'use client'

import { motion } from 'framer-motion'
import { Shield, Code, Database, Globe, Terminal, Lock } from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Cybersecurity',
      icon: <Shield className="h-8 w-8" />,
      skills: [
        'Penetration Testing',
        'Vulnerability Assessment',
        'CTF Competitions',
        'Network Security',
        'Digital Forensics',
        'Security Analysis'
      ]
    },
    {
      title: 'Frontend Development',
      icon: <Globe className="h-8 w-8" />,
      skills: [
        'React.js',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Tailwind CSS',
        'HTML/CSS'
      ]
    },
    {
      title: 'Backend Development',
      icon: <Terminal className="h-8 w-8" />,
      skills: [
        'Python',
        'FastAPI',
        'Node.js',
        'Express.js',
        'RESTful APIs',
        'Authentication'
      ]
    },
    {
      title: 'Database & Tools',
      icon: <Database className="h-8 w-8" />,
      skills: [
        'MongoDB',
        'Git/GitHub',
        'Linux',
        'Docker',
        'Kali Linux',
        'Wireshark'
      ]
    }
  ]

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to create secure and innovative solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect p-6 rounded-lg cyber-border hover:bg-primary-500/5 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="text-primary-500 mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-gray-400 flex items-center">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
