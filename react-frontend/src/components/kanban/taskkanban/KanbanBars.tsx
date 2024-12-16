import { useEffect, useState } from 'react';
import { Task } from '../../../utils/types';
import { Toaster, toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import KanbanColumn from './KanbanColumn';
import TaskForm from '../tasks/TaskForm';
import { kanbanBarsData } from '../../../utils/data';
import { deleteTask, fetchTasks, updateTask } from '../../../services/services';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const KanbanBars = () => {
  const [fetchedTasks, setFetchedTasks] = useState<Task[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const [tasks] = await Promise.all([fetchTasks()]);
        setFetchedTasks(tasks);
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, []);

  const handleTaskDrop = async (taskId: number, newStatus: string) => {
    try {
      const allTasks = await fetchTasks();
      const draggedTask = allTasks.find((task) => task.id === taskId);

      if (!draggedTask) return;

      const updatedTask = { ...draggedTask, status: newStatus };
      setFetchedTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      await updateTask(taskId, updatedTask);
      toast.success(`Task: "${updatedTask.title}" has been updated successfully!`, {
        className: 'bounce-toast custom-toast react-hot-toast-icon w-fit',
        icon: '🔥',
      });
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('Failed to update task!', {
        className: 'bounce-toast',
        icon: '❌',
      });
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setFetchedTasks((tasks) => tasks.filter((task) => task.id !== taskId));
      toast.success(`The task has been deleted!`, {
        className: 'bounce-toast custom-toast react-hot-toast-icon w-fit',
        icon: '🗑️',
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task!', {
        className: 'bounce-toast',
        icon: '❌',
      });
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const dateFormatter = (date: string) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(newDate);
  };

  const query = useQuery();
  const productId = query.get('id');
  const parsedProductId = productId ? Number(productId) : null;

  return (
    <div className="mt-0 pt-6 px-4 md:px-8 flex gap-6 flex-wrap border-t">
      <Toaster position="bottom-center" reverseOrder={false} />
      {kanbanBarsData.map((bar) => {
        const projectTasks = fetchedTasks.filter((task) => task.project === parsedProductId);
        const filteredTasks = projectTasks.filter((task) => task.status === bar.title);

        return (
          <KanbanColumn
            key={bar.id}
            bar={bar}
            tasks={filteredTasks}
            onTaskDrop={handleTaskDrop}
            onDeleteTask={handleDeleteTask}
            dateFormatter={dateFormatter}
            handleOpenModal={handleOpenModal}
          />
        );
      })}

      <TaskForm openModal={openModal} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default KanbanBars;
