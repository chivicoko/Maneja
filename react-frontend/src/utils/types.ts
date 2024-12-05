export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  substatus: string;
  project: number;  // Project is an ID
  team_members: number[];  // Team members are IDs
  due_date: string;
  created_at: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  created_by: number;
  team_members: number[];
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  avatar: string;
}

export interface kanbanBarProps {
  id: number;
  title: string;
  barIconBg: string;
}
