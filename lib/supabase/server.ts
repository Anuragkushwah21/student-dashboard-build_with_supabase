// lib/supabase/dashboard.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Course, Activity, DashboardData } from '@/types/Course'

// Supabase row shapes (tables के columns के हिसाब से)
// Supabase Table: public.courses
type CourseRow = {
  id: string
  title: string
  progress: number
  icon_name: string
  created_at: string
}

// Supabase Table: public.activities  (agar use karni hai to aise columns banao)
type ActivityRow = {
  id: string
  title: string
  course: string
  due_date: string
  status: 'pending' | 'completed' | 'overdue'
  type: 'assignment' | 'quiz' | 'submission' | 'feedback'
}

/* ---------------- Supabase server client ---------------- */

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // RSC context में ignore
          }
        },
      },
    },
  )
}

/* ---------------- Mapping helpers (DB → UI types) ---------------- */

function mapCourseRow(row: CourseRow): Course {
  return {
    id: row.id,
    name: row.title,
    instructor: 'Auto-assigned Instructor', // फिलहाल hardcoded
    progress: row.progress,
    color: 'purple',                        // simple default; चाहो तो icon_name से बदल सकते हो
    icon: row.icon_name,
  }
}

function mapActivityRow(row: ActivityRow): Activity {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    course: row.course,
    dueDate: row.due_date,
    status: row.status,
  }
}

/* ---------------- Data functions ---------------- */

// ✅ Get all courses
export async function getCourses(): Promise<Course[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select('id, title, progress, icon_name, created_at')
    .order('progress', { ascending: false })

  if (error) {
    console.error('Error fetching courses:', error)
    return []
  }

  const rows = (data ?? []) as CourseRow[]
  return rows.map(mapCourseRow)
}

// ✅ Get single course by ID
export async function getCourseById(id: string): Promise<Course | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select('id, title, progress, icon_name, created_at')
    .eq('id', id)
    .single()

  if (error || !data) {
    console.error('Error fetching course by id:', error)
    return null
  }

  return mapCourseRow(data as CourseRow)
}

// ✅ Get activities (pending only)
export async function getActivities(): Promise<Activity[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('status', 'pending')
    .order('due_date', { ascending: true })

  if (error) {
    console.error('Error fetching activities:', error)
    return []
  }

  const rows = (data ?? []) as ActivityRow[]
  return rows.map(mapActivityRow)
}

// ✅ Get upcoming deadlines
export async function getUpcomingDeadlines(): Promise<Activity[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .in('status', ['pending', 'overdue'])
    .order('due_date', { ascending: true })
    .limit(5)

  if (error) {
    console.error('Error fetching upcoming deadlines:', error)
    return []
  }

  const rows = (data ?? []) as ActivityRow[]
  return rows.map(mapActivityRow)
}

// ✅ Get complete dashboard data
export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient()

  const [
    { data: coursesData, error: coursesError },
    { data: activitiesData, error: activitiesError },
    { data: deadlinesData, error: deadlinesError },
  ] = await Promise.all([
    supabase
      .from('courses')
      .select('id, title, progress, icon_name, created_at')
      .order('progress', { ascending: false }),
    supabase
      .from('activities')
      .select('*')
      .eq('status', 'pending')
      .order('due_date', { ascending: true })
      .limit(5),
    supabase
      .from('activities')
      .select('*')
      .in('status', ['pending', 'overdue'])
      .order('due_date', { ascending: true })
      .limit(5),
  ])

  if (coursesError) console.error('Error fetching courses:', coursesError)
  if (activitiesError) console.error('Error fetching activities:', activitiesError)
  if (deadlinesError) console.error('Error fetching deadlines:', deadlinesError)

  const courses =
    ((coursesData ?? []) as CourseRow[]).map(mapCourseRow) ?? []
  const recentActivity =
    ((activitiesData ?? []) as ActivityRow[]).map(mapActivityRow) ?? []
  const upcomingDeadlines =
    ((deadlinesData ?? []) as ActivityRow[]).map(mapActivityRow) ?? []

  return {
    student: {
      name: 'Anurag Kushwah',
      email: 'anurag@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anurag',
    },
    gpa: 3.8,
    courses,
    recentActivity,
    upcomingDeadlines,
  }
}