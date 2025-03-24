import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);


  // load task on local storage by using useEffec hook

  useEffect(() => {
    const saveTodos = JSON.parse(localStorage.getItem("todos"));
    if (saveTodos) {
      setTodos(saveTodos);
    }
  }, []);

  // save task to local stroage  when updated

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    else {
      localStorage.removeItem("todos");
    }
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") {
      return;
    }
    if (editIndex !== null) {
      const UpdatedTodos = todos.map((todo, index) =>
        index === editIndex ? newTodo : todo
      );
      setTodos(UpdatedTodos);
      setEditIndex(null);
    }
    else {
      setTodos([...todos, newTodo]);
    }
    setNewTodo("");
  }

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  }

  const editTodo = (index) => {
    setNewTodo(todos[index]);
    setEditIndex(index);
  }


  return (
    <div className='max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 w-full 
    border border-black'>
      <h2 className='text-2xl font-bold text-center mb-4'>ToDo List Made by Me</h2>

      {   /* input and Add button here */}
      <div className='flex flex-col sm:flex-row gap-3 mb-4'>
        <input className=' p-2 flex-1 rounded focus:outline-none focus: ring-2 focus: ring-blue-400 border' type="text" placeholder='Enter your task' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition' onClick={addTodo}>
          {editIndex !== null ? "Update" : "Add"}

        </button>


      </div>
      {/*  Todo List */}
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between  items-center bg-gray-200 p-2 rounded-lg border border-black"
          >
            <span className="text-blue-500  font-bold break-all">{todo}</span>
            <div className="flex space-x-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                onClick={() => editTodo(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                onClick={() => deleteTodo(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* clear all buttons */}
      {todos.length > 0 && (
        <button className='w-full mt-4  bg bg-blue-500  text-white  py-2 rounded hover:bg-red-600 transition' onClick={() => setTodos([])}>
          Clear All
        </button>
      )}
    </div>
  )
}

export default TodoList;






/*
import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load tasks from local storage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save tasks to local storage when updated
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? newTodo : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    setNewTodo("");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index) => {
    setNewTodo(todos[index]);
    setEditIndex(index);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Tdo List Made by Me</h2>
 

      //       Input and Add Button
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter Your Task"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={addTodo}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
 

      //   Todo List  
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded shadow-sm"
          >
            <span className="text-gray-800 break-all">{todo}</span>
            <div className="flex space-x-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                onClick={() => editTodo(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                onClick={() => deleteTodo(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      
      //  Clear All Button
      {todos.length > 0 && (
        <button
          className="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          onClick={() => setTodos([])}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default TodoList;

*/

