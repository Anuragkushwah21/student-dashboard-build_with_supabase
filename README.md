# Student Dashboard - Next-Gen Learning Platform

A futuristic, highly animated student dashboard built with Next.js 14, Supabase, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Dark Mode Only** UI with glowing gradients
- **Bento Grid Layout** - Modern tile-based design
- **Real-time Data** from Supabase PostgreSQL
- **Hardware-Accelerated Animations** using Framer Motion
- **Zero Layout Shifts** - All animations use transform & opacity
- **Fully Responsive** - Desktop, Tablet, Mobile
- **Server Components** for data fetching
- **Skeleton Loaders** with pulsing animations
- **Spring Physics** for natural animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/student-dashboard.git
cd student-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Set up Supabase database:
   - Create a free project at [supabase.com](https://supabase.com)
   - Run the SQL from `supabase/schema.sql` in the SQL editor
   - Seed data will be inserted automatically

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture Decisions

### Server vs Client Components

- **Server Components**: Data fetching logic in `src/lib/supabase/server.ts`
- **Client Components**: All interactive components (`'use client'`) with Framer Motion
- **Suspense Boundaries**: Used for loading states with skeleton loaders

### Animation Strategy

- **Staggered Entrance**: Each tile fades in sequentially with `delay` in Framer Motion
- **Spring Physics**: `type: "spring", stiffness: 300, damping: 20` for natural feel
- **No Layout Shifts**: Only `transform` and `opacity` used for animations
- **Hover States**: Scale up 1-2% with border glow reveal

### Responsive Design

- **Desktop (>1024px)**: Full Bento grid + visible sidebar
- **Tablet (768-1024px)**: Sidebar icons only, 2-column grid
- **Mobile (<768px)**: Bottom navigation, single column stack

## 📁 Project Structure
