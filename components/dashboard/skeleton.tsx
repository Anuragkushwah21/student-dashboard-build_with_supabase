'use client'

import { motion } from 'framer-motion'

export function DashboardSkeleton() {
  return (
    <div className="flex-1 p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto">
      {/* Hero Skeleton */}
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        className="h-40 md:h-48 lg:h-56 rounded-2xl bg-[#151515]"
      />

      {/* Courses Skeleton */}
      <section className="space-y-3 md:space-y-4">
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-6 w-32 md:w-40 rounded bg-[#151515]"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.1,
              }}
              className="h-32 md:h-40 rounded-xl bg-[#151515]"
            />
          ))}
        </div>
      </section>

      {/* Activity Skeleton */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15,
            }}
            className="h-40 md:h-56 rounded-xl bg-[#151515]"
          />
        ))}
      </section>
    </div>
  )
}