import { useDrop } from 'react-dnd';
import TaskListRow, { TaskListRowDragLayer } from './TaskListRow';
import { TableColumnProps } from '../../../utils/types';
import { IconButton } from '@mui/material';
import { Add, MoreHoriz } from '@mui/icons-material';

const TableColumn: React.FC<TableColumnProps> = ({ 
  bar, 
  fetchedTasks, 
  handleTaskDrop, 
  dateFormatter, 
  handleDeleteTask, 
  parsedProductId,
  handleOpenModal
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: number }) => {
      handleTaskDrop(item.id, bar.title);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Filter tasks based on the project and status
  const projectTasks = fetchedTasks.filter(task => task.project === parsedProductId);
  const filteredTasks = projectTasks.filter(task => task.status === bar.title);

  return (
    <div ref={drop} className={`${isOver ? 'bg-blue-100' : 'bg-[#F0F4F4]'} w-full custom-scrollbar overflow-x-scroll`}>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className=''>
          <tr className='border-0 rounded-[4px]'>
            <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider' colSpan={6}>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 ${bar.barIconBg} rounded-full`}></span>
                <span className="text-sm">{bar.title}</span>
                <span className="h-5 w-5 flex items-center justify-center p-1 text-white text-xs bg-blue-700 rounded-full">
                  {filteredTasks.length}
                </span>
              </div>
            </th>
            <th className='px-6 text-left text-xs font-medium text-gray-500 tracking-wider'>
              <div className="flex relative">
                <IconButton color="default" onClick={handleOpenModal}>
                  <Add fontSize="small" />
                </IconButton>
                <IconButton color="default">
                  <MoreHoriz fontSize="small" />
                </IconButton>
              </div>
            </th>
          </tr>
        </thead>
        <thead className='bg-gray-50'>
          <tr className='border-0 rounded-[4px]'>
            {/* Table Headers */}
            <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Task Name</th>
            <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Description</th>
            <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Assignees</th>
            <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Priority</th>
            <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Due Date</th>
            <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Sub-status</th>
            <th className='px-6 py-2 text-left text-xs font-medium text-gray-500 tracking-wider'>Action</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskListRow key={task.id} task={task} onDelete={handleDeleteTask} status={task.status} dateFormatter={dateFormatter} />
            ))
          ) : (
            <tr className="text-gray-500 text-sm">
              <td colSpan={7} className='text-center'>No tasks available</td>
            </tr>
          )}
          <TaskListRowDragLayer />
        </tbody>
      </table>

      
    </div>
  );
};

export default TableColumn;
