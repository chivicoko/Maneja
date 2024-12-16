import { useDrop } from 'react-dnd';
import { IconButton } from '@mui/material';
import { Add, MoreHoriz } from '@mui/icons-material';
import KanbanCard, { KanbanCardDragLayer } from './KanbanCard';
import { KanbanColumnProps } from '../../../utils/types';


const KanbanColumn = ({ bar, tasks, onTaskDrop, onDeleteTask, dateFormatter, handleOpenModal }: KanbanColumnProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: number }) => onTaskDrop(item.id, bar.title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`kanban-bar ${isOver ? 'bg-blue-100' : 'bg-[#F0F4F4]'} w-[23%] h-fit p-2 shadow-sm rounded-2xl flex justify-between items-start mb-4 pb-16`}>
      <div className="flex flex-col gap-2 w-full">
        <div className="py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 ${bar.barIconBg} rounded-full`}></span>
            <span className="text-sm">{bar.title}</span>
            <span className="h-5 w-5 flex items-center justify-center p-1 text-white text-xs bg-blue-700 rounded-full">
              {tasks.length}
            </span>
          </div>
          <div className="flex relative">
            <IconButton color="default" onClick={handleOpenModal}>
              <Add fontSize="small" />
            </IconButton>
            <IconButton color="default">
              <MoreHoriz fontSize="small" />
            </IconButton>
          </div>
        </div>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <KanbanCard key={task.id} task={task} onDelete={onDeleteTask} status={task.status} dateFormatter={dateFormatter} />
          ))
        ) : (
          <div className="text-gray-500 text-sm">No tasks available</div>
        )}
        <KanbanCardDragLayer />
      </div>
    </div>
  );
};

export default KanbanColumn;
