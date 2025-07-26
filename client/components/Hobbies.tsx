'use client'

import { motion } from 'framer-motion'
import { Award, Music, Camera, MapPin, Dice5, Dumbbell } from 'lucide-react'

const Hobbies = () => {
  const hobbies = [
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Outdoor Sports',
      description: 'Enjoying activities like cricket, basketball and hiking in nature'
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: 'Music',
      description: 'Listening to various genres and exploring new artists'
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: 'Photography',
      description: 'Capturing moments and exploring creative composition'
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Travel',
      description: 'Exploring new places and experiencing different cultures'
    },
    {
      icon: <Dice5 className="h-8 w-8" />,
      title: 'Board games',
      description: 'Exploring different board games and strategies'
    },
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: 'Fitness',
      description: 'Staying active with workouts and outdoor activities'
    }
  ]

  return (
    <section id="hobbies" className="py-20 bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Hobbies & Interests</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What I enjoy doing when I'm not coding or hacking
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect p-6 rounded-lg cyber-border hover:bg-primary-500/5 transition-all duration-300 text-center group"
            >
              <div className="text-primary-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {hobby.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{hobby.title}</h3>
              <p className="text-gray-400">{hobby.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hobbies
