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

export interface Bar {
  id?: number;
  title: string;
  barIconBg: string;
}

export interface TableColumnProps {
  bar: Bar;
  fetchedTasks: Task[];
  handleTaskDrop: (taskId: number, status: string) => void;
  dateFormatter: (date: string) => string;
  handleDeleteTask: (taskId: number) => void;
  parsedProductId: number | null;
  handleOpenModal: () => void;
}

export interface KanbanColumnProps {
  bar: Bar;
  tasks: Task[];
  onTaskDrop: (taskId: number, newStatus: string) => Promise<void>;
  onDeleteTask: (taskId: number) => Promise<void>;
  dateFormatter: (date: string) => string;
  handleOpenModal: () => void;
}

export interface ChartData {
  monthYear: string;
  systolic: number;
  diastolic: number;
}