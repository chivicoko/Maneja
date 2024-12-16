import React, { useEffect, useState } from 'react';
import { DeleteOutline, DescriptionOutlined, Edit, ForumOutlined, LinkOutlined, MoreHoriz, OutlinedFlag, RemoveRedEye } from "@mui/icons-material";
import { IconButton } from "@mui/material";
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

const KanbanCard: React.FC<KanbanCardProps> = ({ task, status, dateFormatter, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [isToggled, setIsToggled] = useState(false);

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
    <div ref={drag} key={task.id} className={`bg-white shadow-sm cursor-grab rounded-xl ${isDragging ? 'opacity-50 border-2 border-dashed border-gray-600' : ''}`}>
      <div className="px-2 w-full flex items-center justify-between">
        <div className={`rounded-md py-1 px-2 flex items-center gap-2 ${task.substatus === 'Not started' ? 'bg-pink-100' : task.substatus === 'In Research' ? 'bg-amber-100' : task.substatus === 'On Track' ? 'bg-purple-100' : 'bg-green-100'}`}>
          <span className={`w-2 h-2 rounded-full ${task.substatus === 'Not started' ? 'bg-pink-600' : task.substatus === 'In Research' ? 'bg-amber-600' : task.substatus === 'On Track' ? 'bg-purple-600' : 'bg-green-600'}`}></span>
          <span className={`text-xs ${task.substatus === 'Not started' ? 'text-pink-600' : task.substatus === 'In Research' ? 'text-amber-600' : task.substatus === 'On Track' ? 'text-purple-700' : 'text-green-700'}`}>{task.substatus}</span>
        </div>
        <div className="flex relative">
          <IconButton color="default" onClick={() => setIsToggled(prev => !prev)}>
            <MoreHoriz fontSize="small" />
          </IconButton>
            {
              isToggled &&
              <div className='absolute top-12 right-0 h-fit w-fit py-1 whitespace-nowrap shadow-2xl border-2 rounded-lg bg-slate-100 z-40'>
                <ul>
                  <li className=''>
                    <a href="#" className='py-1 px-4 flex items-center gap-2 text-gray-600 hover:text-gray-600 cursor-pointer hover:bg-slate-200'>
                      <RemoveRedEye style={{width: '16px'}} /> View
                    </a>
                  </li>
                  <li className=''>
                    <button onClick={handleOpenModal} className='w-full py-1 px-4 flex items-center gap-2 text-gray-600 cursor-pointer hover:bg-slate-200'>
                      <Edit style={{width: '16px'}} /> Edit
                    </button>
                  </li>
                  <li className=''>
                    <button onClick={() => onDelete(task.id)} className='py-1 px-4 flex items-center gap-2 text-gray-600 cursor-pointer hover:bg-slate-200'>
                      <DeleteOutline style={{width: '16px'}}/> Delete
                    </button>
                  </li>
                </ul>
              </div>
            }
        </div>
      </div>

      <div className="bg-white w-full p-3 shadow-sm rounded-xl flex justify-between items-center">
        <div className="h-full w-full flex flex-col justify-between items-start gap-3">
          <h2 className="font-semibold text-sm">{task.title}</h2>
          <p className="justify-between text-xs">{task.description.slice(0, 40)}...</p>
          
          {/* Team Members Section */}
          <div className="w-full flex items-center justify-between text-gray-600">
            <p className="text-xs">Assignees:</p>
            <div className="relative flex">
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
                <div className="rounded-full h-6 w-6 bg-gray-200 flex items-center justify-center z-20 text-xs text-gray-600" style={{ left: `-${3 * 11}px`, position: 'relative' }}>
                  +{assignedMembers.length - 3}
                </div>
              )}
            </div>
          </div>

          {/* Due date and priority */}
          <div className="w-full flex items-center justify-between gap-3">
            <div className="flex items-center text-gray-600">
              <OutlinedFlag className="text-gray-500" fontSize="small" />
              <p className='flex items-center py-1 px-3 h-fit w-fit rounded-full text-xs'>{dateFormatter(task.due_date)}</p>
            </div>
            <p className={`flex items-center py-1 px-3 h-fit w-fit rounded-full text-xs font-semibold ${task.priority === 'Low' ? 'bg-pink-100 text-pink-600' : task.priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-purple-100 text-purple-700'}`}>{task.priority}</p>
          </div>

          {/* Footer with comments, links, and tasks */}
          <div className="flex items-center justify-between border-t-2 text-xs w-full pt-3 text-gray-600">
            <span><ForumOutlined className="text-gray-500" fontSize="small" /> 12 comments</span>
            <span><LinkOutlined className="transform -rotate-45 text-gray-500" fontSize="small" /> 1 links</span>
            <span><DescriptionOutlined className="text-gray-500" fontSize="small" /> 0/3</span>
          </div>
        </div>
      </div>
      
      {/* Task Form */}
      <TaskForm
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};


// Drag Preview Layer Component
const KanbanCardDragLayer = () => {
  const { isDragging, currentOffset } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getClientOffset(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x-55}px, ${y-70}px)`;

  return (    
    <div className="bg-white rounded-xl pt-2 fixed pointer-events-none top-0 left-0 z-50 shadow-2xl" style={{ transform }}>
      <div className="px-2 w-full flex items-center justify-between">
        <div className={`rounded-md py-1 px-2 flex items-center gap-2 bg-gray-100`}>
          <span className={`w-2 h-2 rounded-full bg-gray-600`}></span>
          <span className={`text-xs text-gray-700`}>substatus</span>
        </div>
      </div>

      <div className="bg-white w-full p-3 shadow-sm rounded-xl flex justify-between items-center">
        <div className="h-full w-full flex flex-col justify-between items-start gap-3">
          <h2 className="font-semibold text-sm">The Current Task being moved</h2>
          {/* <p className="justify-between text-xs">Lorem ipsum dolor, lorem dolor sit dolo...</p> */}
          <p className="justify-between text-xs">This is the current task that is being dra...</p>
          
          {/* Team Members Section */}
          <div className="w-full flex items-center justify-between text-gray-600">
            <p className="text-xs">Assignees:</p>
            <div className="relative flex">
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
                <div className="rounded-full h-6 w-6 bg-gray-200 flex items-center justify-center z-20 text-xs text-gray-600" style={{ left: `-${3 * 11}px`, position: 'relative' }}>
                  +{locallyAssignedMembers.length - 3}
                </div>
              )}
            </div>
          </div>

          {/* Due date and priority */}
          <div className="w-full flex items-center justify-between gap-3">
            <div className="flex items-center text-gray-600">
              <OutlinedFlag className="text-gray-500" fontSize="small" />
              <p className='flex items-center py-1 px-3 h-fit w-fit rounded-full text-xs'>30 Oct 2025</p>
            </div>
            <p className={`flex items-center py-1 px-3 h-fit w-fit rounded-full text-xs font-semibold bg-gray-100 text-gray-700`}>Priority</p>
          </div>

          {/* Footer with comments, links, and tasks */}
          <div className="flex items-center justify-between border-t-2 text-xs w-full pt-3 text-gray-600">
            <span><ForumOutlined className="text-gray-500" fontSize="small" /> 12 comments</span>
            <span><LinkOutlined className="transform -rotate-45 text-gray-500" fontSize="small" /> 1 links</span>
            <span><DescriptionOutlined className="text-gray-500" fontSize="small" /> 0/3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
export { KanbanCardDragLayer };
