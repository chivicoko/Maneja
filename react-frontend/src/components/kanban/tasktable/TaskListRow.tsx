import React, { useEffect, useState } from 'react';
import { DeleteOutline, Edit, OutlinedFlag, RemoveRedEye } from "@mui/icons-material";
import { Task, User } from '../../../utils/types';
import { fetchUsers } from '../../../services/services';
import { useDrag, useDragLayer } from 'react-dnd';
import { locallyAssignedMembers } from '../../../utils/data';
import TaskForm from '../tasks/TaskForm';

interface KanbanCardProps {
  task: Task;
  status: string;
  dateFormatter: (date: string) => string;
  onDelete: (taskId: number) => void;
}

const TaskListRow: React.FC<KanbanCardProps> = ({ task, status, dateFormatter, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // Use the service function to fetch users
        const usersResponse = await fetchUsers();
        setTeamMembers(usersResponse);
      } catch (e) {
        console.error('Error fetching users:', e);
      }
    };
    getData();
  }, []);

  // drag
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  // Filter the team members based on task's assigned member IDs
  const assignedMembers = teamMembers.filter(member => task.team_members.includes(member.id));

  if (task.status !== status) {
    return null;
  }
  
  // Function to open the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <tr ref={drag} key={task.id} className={`bg-white shadow-sm cursor-grab rounded-xl ${isDragging ? 'opacity-50 border-2 border-dashed border-gray-600' : ''}`}>
        <td className="pr-2 pl-6 py-2 font-semibold text-sm">{task.title.slice(0, 20)}</td>
        <td className="px-2 py-2 text-xs">{task.description.slice(0, 40)}...</td>

        {/* Assigned members */}
        <td className="px-2 pt-3 relative flex items-center">
          {assignedMembers.slice(0, 3).map((member, index) => (
            <img
              key={member.id}
              src={member.avatar}
              alt={`${member.full_name}'s avatar`}
              className="rounded-full h-6 w-6"
              style={{ left: `-${index * 11}px`, zIndex: index, position: 'relative' }}
            />
          ))}
          {assignedMembers.length > 3 && (
            <span
              className="rounded-full h-6 w-6 bg-gray-200 flex items-center justify-center z-20 text-xs text-gray-600"
              style={{ left: `-${3 * 11}px`, position: 'relative' }}
            >
              +{assignedMembers.length - 3}
            </span>
          )}
        </td>

        {/* Priority */}
        <td className='px-2 py-2'>
          <span className={`py-1 px-3 h-fit w-fit rounded-full text-xs font-semibold ${task.priority === 'Low' ? 'bg-pink-100 text-pink-600' : task.priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-purple-100 text-purple-700'}`}>
            {task.priority}
          </span>
        </td>
        
        {/* Due date column */}
        <td className="px-2 py-2 text-gray-600">
          <div className="flex items-center">
            <OutlinedFlag className="text-gray-500" fontSize="small" />
            <span className="py-1 px-3 h-fit w-fit rounded-full text-xs">{dateFormatter(task.due_date)}</span>
          </div>
        </td>

        {/* Substatus */}
        <td className='px-2 py-2'>
          <div className={`rounded-md py-1 px-2 flex items-center gap-2 ${task.substatus === 'Not started' ? 'bg-pink-100' : task.substatus === 'In Research' ? 'bg-amber-100' : task.substatus === 'On Track' ? 'bg-purple-100' : 'bg-green-100'}`}>
            <span className={`w-2 h-2 rounded-full ${task.substatus === 'Not started' ? 'bg-pink-600' : task.substatus === 'In Research' ? 'bg-amber-600' : task.substatus === 'On Track' ? 'bg-purple-600' : 'bg-green-600'}`}></span>
            <span className={`text-xs ${task.substatus === 'Not started' ? 'text-pink-600' : task.substatus === 'In Research' ? 'text-amber-600' : task.substatus === 'On Track' ? 'text-purple-700' : 'text-green-700'}`}>{task.substatus}</span>
          </div>
        </td>

        {/* Action buttons */}
        <td className='px-2 py-2'>
          <span className="flex items-center">
            <a href="#" className="w-7 h-7 rounded-full flex items-center justify-center gap-2 text-gray-600 hover:bg-slate-200 hover:text-blue-600">
              <RemoveRedEye style={{ width: '16px' }} />
            </a>
            <button onClick={handleOpenModal} className="w-7 h-7 rounded-full flex items-center justify-center gap-2 text-gray-600 hover:bg-slate-200 hover:text-green-600">
              <Edit style={{ width: '16px' }} />
            </button>
            <button onClick={() => onDelete(task.id)} className="w-7 h-7 rounded-full flex items-center justify-center gap-2 text-gray-600 hover:bg-slate-200 hover:text-red-600">
              <DeleteOutline style={{ width: '16px' }} />
            </button>
          </span>
        </td>
      </tr>


      {/* Task Form */}
      <TaskForm
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};



// Drag Preview Layer Component
const TaskListRowDragLayer = () => {
  const { isDragging, currentOffset } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getClientOffset(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x+55}px, ${y-30}px)`;

  return (
    <table className="bg-white rounded-xl pt-2 fixed pointer-events-none top-0 left-0 z-50 shadow-2xl" style={{ transform }}>
      <thead></thead>
      <tbody>
        <tr>
            <td className="pr-2 pl-6 py-4 font-semibold text-sm">Title of the task</td>
            <td className="px-2 py-2 text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste.</td>

            {/* Assigned members */}
            <td className="px-2 pt-3 relative flex items-center">
              {locallyAssignedMembers.slice(0, 3).map((member, index) => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={`Member's avatar`}
                  className="rounded-full h-6 w-6"
                  style={{ left: `-${index * 11}px`, zIndex: index, position: 'relative' }}
                />
              ))}
              {locallyAssignedMembers.length > 3 && (
                <span
                  className="rounded-full h-6 w-6 bg-gray-200 flex items-center justify-center z-20 text-xs text-gray-600"
                  style={{ left: `-${3 * 11}px`, position: 'relative' }}
                >
                  +{locallyAssignedMembers.length - 3}
                </span>
              )}
            </td>

            {/* Priority */}
            <td className='px-2 py-2'>
              <span className={`py-1 px-3 h-fit w-fit rounded-full text-xs font-semibold bg-amber-100 text-amber-600`}>
                High
              </span>
            </td>
            
            {/* Due date column */}
            <td className="px-2 py-2 text-gray-600">
              <div className="flex items-center">
                <OutlinedFlag className="text-gray-500" fontSize="small" />
                <span className="py-1 px-3 h-fit w-fit rounded-full text-xs">05 Dec 2024</span>
              </div>
            </td>

            {/* Substatus */}
            <td className='px-2 py-2'>
              <div className={`rounded-md py-1 px-2 flex items-center gap-2 bg-purple-100`}>
                <span className={`w-2 h-2 rounded-full bg-purple-600`}></span>
                <span className={`text-xs text-purple-700`}>On Track</span>
              </div>
            </td>

            {/* Action buttons */}
            <td className='px-2 py-2'>
              <td className="flex items-center">
                <a href="#" className="w-7 h-7 rounded-full flex items-center justify-center gap-2 text-gray-600 hover:bg-slate-200 hover:text-blue-600">
                  <RemoveRedEye style={{ width: '16px' }} />
                </a>
                <button className="w-7 h-7 rounded-full flex items-center justify-center gap-2 text-gray-600 hover:bg-slate-200 hover:text-green-600">
                  <Edit style={{ width: '16px' }} />
                </button>
                <button className="w-7 h-7 rounded-full flex items-center justify-center gap-2 text-gray-600 hover:bg-slate-200 hover:text-red-600">
                  <DeleteOutline style={{ width: '16px' }} />
                </button>
              </td>
            </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TaskListRow;
export { TaskListRowDragLayer };
