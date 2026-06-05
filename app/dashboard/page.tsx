// app/dashboard/page.tsx
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/sidebar'
import { HeroTile } from '@/components/dashboard/hero-tile'
import { CourseCards } from '@/components/dashboard/course-cards'
import { ActivityTile } from '@/components/dashboard/activity-tile'
import { DashboardSkeleton } from '@/components/dashboard/skeleton'
import type { DashboardData, Course, Activity } from '@/types/Course'

type CourseRow = {
  id: string
  title: string
  progress: number
  icon_name: string
  created_at: string
}

// ✅ Dummy activities
const DUMMY_RECENT_ACTIVITY: Activity[] = [
  {
    id: 'a1',
    type: 'assignment',
    title: 'Finish React assignment',
    course: 'Advanced React Patterns',
    dueDate: '2026-06-10',
    status: 'completed',
  },
  {
    id: 'a2',
    type: 'quiz',
    title: 'Midterm Quiz',
    course: 'Next.js 14 Masterclass',
    dueDate: '2026-06-12',
    status: 'pending',
  },
  {
    id: 'a3',
    type: 'submission',
    title: 'Submit TypeScript project',
    course: 'TypeScript for Pros',
    dueDate: '2026-06-15',
    status: 'overdue',
  },
]

const DUMMY_UPCOMING_DEADLINES: Activity[] = [
  {
    id: 'd1',
    type: 'assignment',
    title: 'Build Dashboard UI',
    course: 'Advanced React Patterns',
    dueDate: '2026-06-18',
    status: 'pending',
  },
  {
    id: 'd2',
    type: 'quiz',
    title: 'Framer Motion Basics Quiz',
    course: 'Framer Motion Animations',
    dueDate: '2026-06-20',
    status: 'pending',
  },
]

async function DashboardContent() {
  const supabase = await createClient()

  let data: DashboardData = {
    student: {
      name: 'Alex Johnson',
      email: 'alex@university.edu',
      avatar: 'AJ',
    },
    gpa: 3.82,
    courses: [],
    recentActivity: DUMMY_RECENT_ACTIVITY,
    upcomingDeadlines: DUMMY_UPCOMING_DEADLINES,
  }

  try {
    const { data: coursesData, error } = await supabase
      .from('courses')
      .select('id, title, progress, icon_name, created_at')

    console.log(' raw coursesData:', coursesData, 'error:', error)

    if (error) {
      console.error(' Error fetching courses:', error)
    }

    if (coursesData && coursesData.length > 0) {
      const mappedCourses: Course[] = (coursesData as CourseRow[]).map(
        (course) => ({
          id: course.id,
          name: course.title,
          instructor: 'Auto-assigned Instructor',
          progress: course.progress,
          color: 'purple',
          icon: course.icon_name,
        }),
      )

      data = {
        ...data,
        courses: mappedCourses,
      }
    }
  } catch (error) {
    console.error(' Supabase fetch failed:', error)
  }

  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="space-y-8 max-w-7xl mx-auto">
        <HeroTile studentName={data.student.name} gpa={data.gpa} />

        <section aria-label="Your courses">
          <h2 className="text-2xl font-bold text-white mb-6">Your Courses</h2>
          <CourseCards courses={data.courses} />
        </section>

        <section
          aria-label="Activity overview"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <ActivityTile
            activities={data.recentActivity}
            title="Recent Activity"
          />
          <ActivityTile
            activities={data.upcomingDeadlines}
            title="Upcoming Deadlines"
          />
        </section>
      </div>
    </main>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <Sidebar studentName="Alex Johnson" />
      <Suspense fallback={<DashboardSkeleton />}>
       
        <DashboardContent />
      </Suspense>
    </div>
  )
}