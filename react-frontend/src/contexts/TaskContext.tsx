import { createContext, useEffect, useState, ReactNode } from 'react';
import { Project, Task, User } from '../utils/types';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Export TaskContextProps to use in other files
export interface TaskContextProps {
    tasks: Task[];
    projects: Project[];
    users: User[];
    fetchTasks: () => Promise<Task[]>;
    fetchProjects: () => Promise<Project[]>;
    fetchUsers: () => Promise<User[]>;
    fetchProjectById: (id: number) => Promise<Project>;
    fetchUserById: (id: number) => Promise<User>;
    addTask: (task: Omit<Task, 'id'>) => Promise<Task>;
    updateTask: (id: number, updatedTask: Task) => Promise<Task>;
    deleteTask: (id: number) => Promise<void>;
    // dateFormatter: (date: string) => string;
}

// Create TaskContext
const TaskContext = createContext<TaskContextProps | undefined>(undefined);

// TaskProvider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    // Fetch tasks, projects, and users functions
    const fetchTasks = async (): Promise<Task[]> => {
        const response = await axios.get(`${API_BASE_URL}/tasks/`);
        setTasks(response.data);
        return response.data;
    };

    const fetchProjects = async (): Promise<Project[]> => {
        const response = await axios.get(`${API_BASE_URL}/projects/`);
        setProjects(response.data);
        return response.data;
    };

    const fetchUsers = async (): Promise<User[]> => {
        const response = await axios.get(`${API_BASE_URL}/users/`);
        setUsers(response.data);
        return response.data;
    };

    const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
        const response = await axios.post(`${API_BASE_URL}/tasks/`, task);
        return response.data;
    };

    const updateTask = async (id: number, updatedTask: Task): Promise<Task> => {
        const response = await axios.put(`${API_BASE_URL}/tasks/${id}/`, updatedTask);
        return response.data;
    };

    const deleteTask = async (id: number): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/tasks/${id}/`);
    };

    const fetchProjectById = async (id: number): Promise<Project> => {
        const response = await axios.get(`${API_BASE_URL}/projects/${id}/`);
        return response.data;
    };

    const fetchUserById = async (id: number): Promise<User> => {
        const response = await axios.get(`${API_BASE_URL}/users/${id}/`);
        return response.data;
    };

    // const dateFormatter = (date: string) => {
    //     const newDate = new Date(date);
    //     return new Intl.DateTimeFormat('en-GB', {
    //         day: '2-digit',
    //         month: 'short',
    //         year: 'numeric',
    //     }).format(newDate);
    // };
        
    // Fetch tasks, projects, and users on component mount
    useEffect(() => {
        fetchTasks();
        fetchProjects();
        fetchUsers();
    }, []);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                projects,
                users,
                fetchTasks,
                fetchProjects,
                fetchUsers,
                fetchProjectById,
                fetchUserById,
                addTask,
                updateTask,
                deleteTask,
                // dateFormatter,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

// Export TaskContext for use in other components if needed
export { TaskContext };
