export interface Course {
  id: string;
  name: string;
  instructor: string;
  progress: number;
  color: 'purple' | 'blue' | 'cyan' | 'pink';
  icon: string;
}

export interface Activity {
  id: string;
  type: 'assignment' | 'quiz' | 'submission' | 'feedback';
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
}

export interface DashboardData {
  student: {
    name: string;
    email: string;
    avatar: string;
  };
  gpa: number;
  courses: Course[];
  recentActivity: Activity[];
  upcomingDeadlines: Activity[];
}