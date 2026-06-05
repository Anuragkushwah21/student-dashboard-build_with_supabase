'use client'

import { motion } from 'framer-motion'
import { Flame, Trophy } from 'lucide-react'

interface HeroTileProps {
  studentName: string
  gpa: number
}

export function HeroTile({ studentName, gpa }: HeroTileProps) {
  const firstName = studentName.split(' ')[0] || studentName

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className="relative bg-gradient-to-br from-[#121212] via-[#181818] to-[#222222] rounded-2xl p-8 md:p-10 overflow-hidden border border-purple-900/30 shadow-2xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 blur-3xl" />

      <div className="relative z-10">
        <p className="text-sm font-semibold text-purple-300/80 mb-2">
          Welcome back
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Hey, {firstName}! 👋
        </h1>

        <p className="text-sm md:text-base text-gray-300/90 max-w-xl">
          Your learning streak is on fire. Keep pushing and let&apos;s level up your skills today.
        </p>

        <div className="flex flex-wrap gap-4 md:gap-6 mt-8">
          <motion.div
            className="flex items-center gap-3 bg-[#0a0a0a]/60 backdrop-blur-sm px-6 py-4 rounded-xl border border-orange-500/25"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Flame className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-xs md:text-sm text-gray-400">Day learning streak</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 bg-[#0a0a0a]/60 backdrop-blur-sm px-6 py-4 rounded-xl border border-blue-500/25"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-2xl font-bold text-white">
                {gpa.toFixed ? gpa.toFixed(2) : gpa}
              </p>
              <p className="text-xs md:text-sm text-gray-400">Current GPA</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}