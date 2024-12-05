import axios from 'axios';
import { Project, Task, User } from '../utils/types';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Adjust the base URL accordingly

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_BASE_URL}/tasks/`);
  return response.data;
};

// Fetch all projects
export const fetchProjects = async (): Promise<Project[]> => {
  const response = await axios.get(`${API_BASE_URL}/projects/`);
  return response.data;
};

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_BASE_URL}/users/`);
  return response.data;
};

// Add a new task
export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await axios.post(`${API_BASE_URL}/tasks/`, task);
  return response.data;
};

// Update an existing task
export const updateTask = async (id: number, updatedTask: Task): Promise<Task> => {
  const response = await axios.put(`${API_BASE_URL}/tasks/${id}/`, updatedTask);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/tasks/${id}/`);
};

// Fetch a project by ID
export const fetchProjectById = async (id: number): Promise<Project> => {
  const response = await axios.get(`${API_BASE_URL}/projects/${id}/`);
  return response.data;
};

// Fetch a user by ID
export const fetchUserById = async (id: number): Promise<User> => {
  const response = await axios.get(`${API_BASE_URL}/users/${id}/`);
  return response.data;
};
