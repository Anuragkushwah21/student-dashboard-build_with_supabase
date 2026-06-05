'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Home,
  BookOpen,
  BarChart2,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react'

interface SidebarProps {
  studentName: string
}

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'Courses', href: '/dashboard' },
  { icon: BarChart2, label: 'Progress', href: '/dashboard' },
  { icon: Settings, label: 'Settings', href: '/dashboard' },
]

export function Sidebar({ studentName }: SidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] border border-gray-800 text-gray-100 shadow-lg md:hidden"
        aria-label="Toggle navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop / Tablet sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="
          hidden
          md:flex
          h-screen
          flex-col
          border-r border-gray-800
          bg-[#111111]
          px-3
          py-6
          lg:w-64
          md:w-20
        "
      >
        <div className="mb-6 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-bold text-white">
            {studentName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-white">
              {studentName}
            </p>
            <p className="text-xs text-gray-400">Student</p>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.97 }}
              className="
                flex items-center gap-3
                rounded-lg
                px-3 py-2
                text-sm
                text-gray-300
                hover:bg-[#1a1a1a]
                hover:text-white
                transition-colors
              "
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden lg:inline font-medium">
                {item.label}
              </span>
            </motion.a>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-4 border-t border-gray-800 pt-4">
          <motion.a
            href="/logout"
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            className="
              flex items-center gap-3
              rounded-lg
              px-3 py-2
              text-sm
              text-red-400
              hover:bg-[#1a1a1a]
              transition-colors
            "
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden lg:inline font-medium">Logout</span>
          </motion.a>
        </div>
      </motion.aside>

      {/* Mobile slide‑in drawer */}
      <motion.aside
        initial={false}
        animate={open ? 'open' : 'closed'}
        variants={{
          open: { x: 0 },
          closed: { x: '-100%' },
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        className="
          fixed inset-y-0 left-0 z-30
          flex w-64 flex-col
          border-r border-gray-800
          bg-[#111111]
          px-4 py-6
          md:hidden
        "
      >
        {/* Profile */}
        <div className="mb-6 flex items-center gap-3 px-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-bold text-white">
            {studentName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {studentName}
            </p>
            <p className="text-xs text-gray-400">Student</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen(false)}
              className="
                flex items-center gap-3
                rounded-lg
                px-3 py-2
                text-sm
                text-gray-300
                hover:bg-[#1a1a1a]
                hover:text-white
                transition-colors
              "
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </motion.a>
          ))}
        </nav>

        <div className="mt-4 border-t border-gray-800 pt-4">
          <motion.a
            href="/logout"
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            className="
              flex items-center gap-3
              rounded-lg
              px-3 py-2
              text-sm
              text-red-400
              hover:bg-[#1a1a1a]
              transition-colors
            "
          >
            <LogOut className="h-5 h-5" />
            <span className="font-medium">Logout</span>
          </motion.a>
        </div>
      </motion.aside>

      {/* Mobile backdrop */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
        />
      )}

      {/* Bottom nav for mobile (<768px) */}
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-30
          flex items-center justify-around
          border-t border-gray-800
          bg-[#111111]/95
          px-3 py-2
          md:hidden
        "
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 text-xs text-gray-300"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  )
}