import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import IconCross from '../images/icon-cross.svg';
import IconCheck from '../images/icon-check.svg';
import EditTodo from './EditTodo';
import { useState } from 'react';

const SortableItem = ({
  todo,
  onCompletedHandler,
  onDeleteHandler,
  setDescription,
  setEditMode,
  isOverlay = false,

  isDarkMode,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.todo_id });

  const [isClick, setIsClick] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isOverlay ? 0.5 : 1, // Mengatur opacity saat di-drag
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`hover:cursor-move relative border-b border-[#777a92] items-center  p-3 sm:w-96 w-[327px] lg:w-[600px] ${
        isDarkMode
          ? 'bg-[#25273c] text-[#cacde8]'
          : 'bg-[#fafafa] text-[#484b6a]'
      }  flex justify-between`}
    >
      <div className="flex w-full ">
        {todo.completed === false ? (
          <div
            className="hover:cursor-pointer absolute border-[#777a92] bg-transparent border-2 w-5 h-5 rounded-full"
            onMouseDown={(event) => {
              event.stopPropagation();
              onCompletedHandler(event, todo.todo_id, todo.completed);
            }}
          />
        ) : (
          <div
            className="absolute w-5 h-5 border-2 rounded-full bg-gradient-custom"
            onMouseDown={(event) => {
              event.stopPropagation();
              onCompletedHandler(event, todo.todo_id, todo.completed);
            }}
          >
            <img
              src={IconCheck}
              alt="checklist"
              className="absolute top-1 left-[3px]"
            />
          </div>
        )}

        <div className="flex justify-between w-full">
          {todo.completed === false ? (
            <p className="pl-8">{todo.description}</p>
          ) : (
            <p
              className={`${
                isDarkMode ? 'text-[#cacde8]' : 'text-[#cacde8]'
              } pl-8`}
            >
              <s>{todo.description}</s>
            </p>
          )}

          <EditTodo
            todo={todo}
            setDescription={setDescription}
            setEditMode={setEditMode}
          />
        </div>
        <button
          style={{ position: 'relative', zIndex: 1000 }} // Mengatur z-index tinggi
          onMouseDown={(event) => {
            event.stopPropagation();
            onDeleteHandler(event, todo.todo_id);
          }}
        >
          <img src={IconCross} alt="X" />
        </button>
      </div>
    </div>
  );
};

export default SortableItem;
