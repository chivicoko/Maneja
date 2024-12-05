import { useContext } from 'react';
import { TaskContext, TaskContextProps } from '../contexts/TaskContext'; // Import TaskContextProps

export const useTaskContext = (): TaskContextProps => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
