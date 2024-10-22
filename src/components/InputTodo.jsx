import React from 'react';

const devURL = 'http://localhost:5000';
const prodURL = 'https://todo-app-be-xi.vercel.app';

// Fungsi untuk memilih URL berdasarkan mode environment
const getBaseURL = () => {
  return import.meta.env.MODE === 'development' ? devURL : prodURL;
};

const InputTodo = ({
  isDarkMode,
  description,
  setDescription,
  editMode,
  setEditMode,
  setTodos,
}) => {
  const onChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const body = { description };
        let newTodo;
        let updatedTodo;
        const baseURL = getBaseURL(); // Memanggil fungsi untuk mendapatkan URL yang sesuai

        if (editMode) {
          // Jika sedang dalam mode edit, lakukan update todo

          const response = await fetch(`${baseURL}/todos/${editMode}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
          });

          setEditMode(null); // Kembali ke mode normal setelah edit selesai

          updatedTodo = await response.json(); // Ambil data todo baru dari respons

          // Perbarui state todos dengan todo terbaru
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
            )
          );
        } else {
          // Jika tidak dalam mode edit, lakukan penambahan todo baru
          const response = await fetch(`${baseURL}/todos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
          });

          newTodo = await response.json(); // Ambil data todo baru dari respons
          // Perbarui state todos dengan menambahkan todo baru
          setTodos((prevTodos) => [...prevTodos, newTodo]);
        }
        setDescription(''); // Reset input setelah submit
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full mb-5">
      <form onSubmit={onSubmitHandler} className="relative flex items-center">
        <p className="border-[#777a92] bg-transparent border-2 w-5 h-5 rounded-full absolute top-[14px] left-4"></p>
        <input
          type="text"
          value={description}
          onChange={onChangeHandler}
          className={`pl-12 w-[327px] sm:w-96 lg:w-[600px] rounded-lg p-3 text-white ${
            isDarkMode ? 'bg-[#25273c]' : 'bg-[#fafafa]'
          }`}
          placeholder="Create a new todo..."
        />
      </form>
    </div>
  );
};

export default InputTodo;
