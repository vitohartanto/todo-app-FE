import { useEffect, useState } from 'react';
import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import { DragOverlay } from '@dnd-kit/core';

const ListTodos = ({
  description,
  setDescription,
  setEditMode,
  isDarkMode,
}) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All'); // Menyimpan filter yang dipilih
  const [activeId, setActiveId] = useState(null); // Untuk menyimpan item yang sedang di-drag
  const [isDragging, setIsDragging] = useState(false);

  const onDeleteHandler = (event, id) => {
    event.stopPropagation();
    // Optimistic UI update
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.todo_id !== id));

    deleteTodo(id);
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://todo-app-be-xi.vercel.app/todos/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        // No need to filter again here; it's already done in onDeleteHandler
        console.log(`Todo with id ${id} deleted successfully.`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTodos = async () => {
    const response = await fetch('https://todo-app-be-xi.vercel.app/todos');
    const parsedJson = await response.json();
    console.log(parsedJson);
    setTodos(parsedJson);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onCompletedHandler = (event, id, currentStatus) => {
    event.stopPropagation();

    completeTodo(id, currentStatus);
  };

  const completeTodo = async (id, currentStatus) => {
    try {
      const body = { completed: !currentStatus }; // Mengirim status completed sebagai true
      const completeTodo = await fetch(
        `https://todo-app-be-xi.vercel.app/todos/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      if (completeTodo.ok) {
        // Perbarui state todos setelah berhasil mengubah status di server
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.todo_id === id ? { ...todo, completed: !currentStatus } : todo
          )
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const clearCompletedHandler = async () => {
    try {
      // Hapus semua todo yang memiliki completed true
      const completedTodos = todos.filter((todo) => todo.completed);
      for (let todo of completedTodos) {
        await deleteTodo(todo.todo_id);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
  });

  const buttonAllHandler = () => {
    setFilter('All');
  };
  const buttonActiveHandler = () => {
    setFilter('Active');
  };
  const buttonCompletedHandler = () => {
    setFilter('Completed');
  };

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  const handleDragStart = (event) => {
    setActiveId(event.active.id); // Menyimpan id item yang sedang di-drag
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null); // Reset item yang sedang di-drag
    setIsDragging(false); // Reset isDragging saat drag selesai

    // Pastikan active dan over tidak null
    if (!active || !over) {
      return;
    }

    if (active.id !== over.id) {
      setTodos((prevTodos) => {
        const oldIndex = prevTodos.findIndex(
          (todo) => todo.todo_id === active.id
        );
        const newIndex = prevTodos.findIndex(
          (todo) => todo.todo_id === over.id
        );

        // Cek apakah oldIndex dan newIndex valid
        if (oldIndex === -1 || newIndex === -1) {
          return prevTodos; // Tidak melakukan perubahan jika indeks tidak valid
        }

        const newTodos = arrayMove(prevTodos, oldIndex, newIndex);

        // Kirim urutan baru ke server
        updateTodoOrder(newTodos);

        return newTodos;
      });
    }
  };

  const updateTodoOrder = async (newTodos) => {
    try {
      await fetch('https://todo-app-be-xi.vercel.app/todos/reorder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todos: newTodos }),
      });
    } catch (error) {
      console.error('Error updating order:', error.message);
    }
  };
  return (
    <div className="flex flex-col items-center ">
      <div className="rounded-lg z-[2] overflow-hidden ">
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredTodos}
            strategy={verticalListSortingStrategy}
          >
            {filteredTodos.map((todo) => {
              return (
                <SortableItem
                  key={todo.todo_id}
                  todo={todo}
                  onCompletedHandler={onCompletedHandler}
                  onDeleteHandler={onDeleteHandler}
                  setDescription={setDescription}
                  setEditMode={setEditMode}
                  isDragging={isDragging}
                  isDarkMode={isDarkMode}
                />
              );
            })}
          </SortableContext>

          {/* DragOverlay untuk menampilkan bayangan */}
          <DragOverlay>
            {activeId && todos.find((todo) => todo.todo_id === activeId) ? (
              <SortableItem
                todo={todos.find((todo) => todo.todo_id === activeId)}
                isOverlay={true} // Misalnya, bisa digunakan untuk memberi style berbeda pada overlay
              />
            ) : null}
          </DragOverlay>
        </DndContext>
        <div
          className={`${
            isDarkMode
              ? 'bg-[#25273c] text-[#cacde8]'
              : 'bg-[#fafafa] text-[#484b6a]'
          } w-[327px] sm:w-96 lg:w-[600px] text-sm flex  p-4 justify-between`}
        >
          <p>{itemsLeft} items left</p>
          <button
            className={`${
              isDarkMode ? 'hover:text-white' : 'hover:font-semibold'
            }`}
            onClick={clearCompletedHandler}
          >
            Clear Completed
          </button>
        </div>
      </div>

      <div
        className={`gap-x-3 mt-4 rounded-lg w-[327px] sm:w-96 lg:w-[600px] p-3 ${
          isDarkMode ? 'bg-[#25273c]' : 'bg-[#fafafa]'
        } flex justify-center text-[#cacde8]`}
      >
        <button
          className={`${
            isDarkMode ? 'hover:text-white' : 'hover:font-semibold'
          } ${filter === 'All' ? 'text-[#3a7bfd]' : ''}`}
          onClick={buttonAllHandler}
        >
          All
        </button>
        <button
          className={`${
            isDarkMode ? 'hover:text-white' : 'hover:font-semibold'
          } ${filter === 'Active' ? 'text-[#3a7bfd]' : ''}`}
          onClick={buttonActiveHandler}
        >
          Active
        </button>
        <button
          className={`${
            isDarkMode ? 'hover:text-white' : 'hover:font-semibold'
          } ${filter === 'Completed' ? 'text-[#3a7bfd]' : ''}`}
          onClick={buttonCompletedHandler}
        >
          Completed
        </button>
      </div>

      <h1
        className={`${
          isDarkMode ? 'text-[#cacde8]' : 'text-[#484b6a]'
        } text-sm mt-4`}
      >
        Drag and drop to reorder list
      </h1>
    </div>
  );
};

export default ListTodos;
