'use client'

import { motion, type Variants } from 'framer-motion'
import {
  Code,
  Terminal,
  Sparkles,
  BookOpen,
  Globe,
  Cpu,
  Database,
  Lock,
  Smartphone,
  Cloud,
} from 'lucide-react'
import type { Course } from '@/types/Course'

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Code,
  Terminal,
  Sparkles,
  BookOpen,
  Globe,
  Cpu,
  Database,
  Lock,
  Smartphone,
  Cloud,
}

interface CourseCardsProps {
  courses: Course[]
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
}

export function CourseCards({ courses }: CourseCardsProps) {
  if (!courses || courses.length === 0) {
    return (
      <p className="text-sm text-gray-400">
        No courses found. Add some courses in Supabase to see them here.
      </p>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {courses.map((course) => {
        const IconComponent = iconMap[course.icon] || BookOpen

        return (
          <motion.article
            key={course.id}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#0a0a0a] rounded-lg">
                  <IconComponent className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-sm font-semibold text-purple-400">
                  {course.progress}%
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                {course.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {course.instructor}
              </p>
              <div className="relative h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                />
              </div>
            </div>
          </motion.article>
        )
      })}
    </motion.div>
  )
}