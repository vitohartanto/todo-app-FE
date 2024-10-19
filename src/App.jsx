import InputTodo from './components/InputTodo';
import TopComponent from './components/TopComponent';
import ListTodos from './components/ListTodos';
import { useState } from 'react';
import './App.css';

function App() {
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(null); // Menyimpan ID todo yang sedang diedit
  const [isDarkMode, setIsDarkMode] = useState(true); // State untuk mode

  // Fungsi untuk toggle mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <div
        className={`absolute h-full w-full z-[-3] ${
          isDarkMode ? 'bg-[#161722]' : 'bg-[#e4e5f1]'
        }`}
      ></div>
      <TopComponent isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
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
    </>
  );
}

export default App;
