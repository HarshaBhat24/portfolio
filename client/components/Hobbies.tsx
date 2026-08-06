'use client'

import { motion } from 'framer-motion'
import { Trophy, Music, Camera, MapPin, LayoutGrid, Dumbbell } from 'lucide-react'

const hobbies = [
  {
    icon: <Trophy size={22} />,
    title: 'Outdoor Sports',
    desc: 'Cricket, basketball, and hiking - anything that gets me outdoors and moving.',
    color: '#F5A623',
  },
  {
    icon: <Music size={22} />,
    title: 'Music',
    desc: 'Listening across genres and discovering new artists constantly.',
    color: '#FF2D78',
  },
  {
    icon: <Camera size={22} />,
    title: 'Photography',
    desc: 'Capturing candid moments and experimenting with composition.',
    color: '#00D4AA',
  },
  {
    icon: <MapPin size={22} />,
    title: 'Travel',
    desc: 'Exploring new places, cultures, and cuisines whenever possible.',
    color: '#A8FF3E',
  },
  {
    icon: <LayoutGrid size={22} />,
    title: 'Board Games',
    desc: 'Strategy games, chess, and anything that requires deep thinking.',
    color: '#F5A623',
  },
  {
    icon: <Dumbbell size={22} />,
    title: 'Fitness',
    desc: 'Gym sessions, calisthenics, and staying physically sharp.',
    color: '#FF2D78',
  },
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  whileInView:{ opacity: 1, y:  0 },
  transition: { duration: 0.55, delay },
  viewport:   { once: true },
})

const Hobbies = () => (
  <section id="hobbies" className="py-28 relative overflow-hidden">
    {/* bg accent */}
    <div
      className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(168,255,62,0.03) 0%, transparent 70%)' }}
    />

    <div className="max-w-6xl mx-auto px-6 lg:px-8">

      {/* Header */}
      <motion.div {...fadeUp()} className="mb-16">
        <p className="section-label mb-3">
          <span className="text-amber-400">07</span>&nbsp;/&nbsp;interests
        </p>
        <div className="flex items-end gap-4 flex-wrap">
          <h2 className="font-mono font-bold text-4xl md:text-5xl text-ink-100">
            Hobbies &amp; <span className="gradient-text">Interests</span>
          </h2>
          <div className="h-px flex-1 min-w-16 bg-gradient-to-r from-amber-400/30 to-transparent mb-2.5" />
        </div>
        <p className="text-ink-300 text-sm mt-4 max-w-md">
          Life beyond the terminal - what keeps me curious and balanced.
        </p>
      </motion.div>

      {/* Hobby grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {hobbies.map((hobby, i) => (
          <motion.div
            key={hobby.title}
            {...fadeUp(0.06 + i * 0.08)}
            className="terminal-card p-6 group hover:border-terminal-border-hi transition-all duration-300 flex items-start gap-4"
          >
            {/* Icon */}
            <div
              className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
              style={{
                background: `${hobby.color}14`,
                color: hobby.color,
                boxShadow: `0 0 0 0 ${hobby.color}`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${hobby.color}30`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent'
              }}
            >
              {hobby.icon}
            </div>

            {/* Text */}
            <div>
              <h3 className="font-mono font-semibold text-ink-100 mb-1.5">{hobby.title}</h3>
              <p className="text-ink-300 text-sm leading-6">{hobby.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default Hobbies
