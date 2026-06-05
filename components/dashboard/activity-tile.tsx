'use client'

import { motion, type Variants } from 'framer-motion'
import { CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react'
import type { Activity } from '@/types/Course'
import type { JSX } from 'react'

interface ActivityTileProps {
  activities: Activity[]
  title: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
}

const statusColors: Record<Activity['status'], string> = {
  pending: 'text-yellow-400 bg-yellow-400/10',
  completed: 'text-green-400 bg-green-400/10',
  overdue: 'text-red-400 bg-red-400/10',
}

const statusIcons: Record<Activity['status'], JSX.Element> = {
  pending: <Clock className="w-4 h-4" />,
  completed: <CheckCircle2 className="w-4 h-4" />,
  overdue: <AlertCircle className="w-4 h-4" />,
}

export function ActivityTile({ activities, title }: ActivityTileProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-xl bg-[#111111] border border-purple-900/30 p-6 shadow-lg hover:border-purple-900/50 transition-colors"
    >
      <header className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-lg font-semibold text-white flex items-center gap-2"
        >
          <FileText className="w-5 h-5 text-purple-400" />
          {title}
        </motion.h2>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-semibold text-purple-400 px-3 py-1 bg-purple-400/10 rounded-full"
        >
          {activities.length}
        </motion.span>
      </header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {activities.map((activity) => (
          <motion.article
            key={activity.id}
            variants={itemVariants}
            whileHover={{
              x: 4,
              backgroundColor: 'rgba(147, 51, 234, 0.05)', // purple-600/5
            }}
            className="flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer group"
          >
            <div
              className={`mt-1 p-2 rounded-lg flex-shrink-0 ${statusColors[activity.status]}`}
            >
              {statusIcons[activity.status]}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors truncate">
                {activity.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">{activity.course}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="text-xs text-gray-400">{activity.dueDate}</span>
              </div>
            </div>

            {activity.status === 'overdue' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex-shrink-0 px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded"
              >
                Overdue
              </motion.div>
            )}
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  )
}