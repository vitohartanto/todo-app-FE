import React from 'react';
import { CiEdit } from 'react-icons/ci';

const EditTodo = ({ todo, setDescription, setEditMode }) => {
  const onEditHandler = (event, id) => {
    event.stopPropagation();
    setDescription(todo.description); // Isi input dengan nilai deskripsi dari todo yang ingin diedit.
    setEditMode(id); // Aktifkan mode edit untuk todo dengan ID ini.
  };

  return (
    <button
      className="mr-6"
      onMouseDown={(event) => {
        event.stopPropagation();
        onEditHandler(event, todo.todo_id);
      }}
    >
      <CiEdit />
    </button>
  );
};

export default EditTodo;
