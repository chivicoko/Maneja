import { useEffect, useState } from 'react';
import { Task, Project, User } from '../../utils/types';
import KanbanCard, { KanbanCardDragLayer } from './KanbanCard';
import { IconButton } from '@mui/material';
import { Add, MoreHoriz } from '@mui/icons-material';
import { kanbanBarsData } from '../../utils/data';
import { deleteTask, fetchProjects, fetchTasks, fetchUsers, updateTask } from '../../services/services';
import { useDrop } from 'react-dnd';
import { Toaster, toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';



const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  
  
const KanbanBars = () => {
  const [fetchedTasks, setFetchedTasks] = useState<Task[]>([]);
  const [availableProjects, setAvailableProjects] = useState<Project[]>([]);
  const [availableTeamMembers, setAvailableTeamMembers] = useState<User[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [tasks, projects, users] = await Promise.all([
          fetchTasks(),
          fetchProjects(),
          fetchUsers()
        ]);

        setFetchedTasks(tasks);
        setAvailableProjects(projects);
        setAvailableTeamMembers(users);
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, []);


// Assuming `allTasks` is a state array holding all tasks
const handleTaskDrop = async (taskId: number, newStatus: string) => {
    try {
        const allTasks = await fetchTasks();

      // Find the task that was dragged
      const draggedTask = allTasks.find((task) => task.id === taskId);
    //   console.log(draggedTask);
    //   console.log(allTasks);
      
      if (!draggedTask) return;
  
    //   // Update the task's status locally for instant feedback
      const updatedTask = { ...draggedTask, status: newStatus };
  
      // Update the state with the new status immediately
      setFetchedTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
  
      // Make the API call to update the task in the backend
      await updateTask(taskId, updatedTask);
  
    //   console.log('Task status updated successfully.');
      toast.success(`Task: "${updatedTask.title}" has been updated successfully!`, {
            className: 'bounce-toast custom-toast react-hot-toast-icon w-fit',
            icon: '🔥',
        });
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('Failed to update task!', {
            className: 'bounce-toast',
            icon: '❌',
            style: {
                background: '#1a202c',
                color: '#fff',
                padding: '16px',
                fontSize: '16px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
        });
    }
  };
  

  const dateFormatter = (date: string) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(newDate);
  };

   // Delete task handler
   const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setFetchedTasks((fetchedTasks) => fetchedTasks.filter((task) => task.id !== taskId));
    //   console.log(tasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  const query = useQuery();
  const productId = query.get('id');
  const parsedProductId = productId ? Number(productId) : null;
    // console.log(parsedProductId);
    

  return (
    <div className="mt-6 flex gap-6 flex-wrap">
        <Toaster position="bottom-center" reverseOrder={false} />
      {
        kanbanBarsData.map(bar => {
            const [{ isOver }, drop] = useDrop(() => ({
                accept: 'TASK',
                drop: (item: { id: number }) => {
                  handleTaskDrop(item.id, bar.title);
                },
                collect: (monitor) => ({
                  isOver: !!monitor.isOver(),
                }),
              }));


              // Filter tasks based on the project they belong to
              const projectTasks = fetchedTasks.filter(task => task.project === parsedProductId);
              // Filter tasks based on the status of the current Kanban bar
          const filteredTasks = projectTasks.filter(task => task.status === bar.title);

          return (
            <div ref={drop} key={bar.id} className={`kanban-bar ${isOver ? 'bg-blue-100' : 'bg-[#F0F4F4]'} w-[23%] h-fit bg-[#F0F4F4] p-2 shadow-sm rounded-2xl flex justify-between items-start mb-4 pb-16`}>
              <div className="flex flex-col gap-2 w-full">
                <div className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 ${bar.barIconBg} rounded-full`}></span>
                    <span className="text-sm">{bar.title}</span>
                    {/* Show the number of tasks for this status */}
                    <span className="h-5 w-5 flex items-center justify-center p-1 text-white text-xs bg-blue-700 rounded-full">
                      {filteredTasks.length}
                    </span>
                  </div>
                  <div className="flex relative">
                    <IconButton color="default">
                      <Add fontSize="small" />
                    </IconButton>
                    <IconButton color="default">
                      <MoreHoriz fontSize="small" />
                    </IconButton>
                  </div>
                </div>

                {/* Render the filtered tasks for this Kanban bar */}
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <KanbanCard key={task.id} task={task} onDelete={handleDeleteTask} status={task.status} dateFormatter={dateFormatter} />
                  ))
                ) : (
                  <div className="text-gray-500 text-sm">No tasks available</div>
                )}
                <KanbanCardDragLayer />
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default KanbanBars;
