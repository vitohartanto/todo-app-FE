import React from 'react';
import TopComponent from '../components/TopComponent';
import InputTodo from '../components/InputTodo';
import ListTodos from '../components/ListTodos';

const TodoApp = ({
  isDarkMode,
  toggleDarkMode,
  description,
  setDescription,
  editMode,
  setEditMode,
  onLogout,
  isAuthenticated,
}) => {
  return (
    <>
      {' '}
      <div
        className={`absolute h-full w-full z-[-3] ${
          isDarkMode ? 'bg-[#161722]' : 'bg-[#e4e5f1]'
        }`}
      ></div>
      <TopComponent
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
      />
      <InputTodo
        description={description}
        setDescription={setDescription}
        editMode={editMode}
        setEditMode={setEditMode}
        isDarkMode={isDarkMode}
      />
      <ListTodos
        description={description}
        setDescription={setDescription}
        setEditMode={setEditMode}
        isDarkMode={isDarkMode}
      />
      ;
    </>
  );
};

export default TodoApp;
