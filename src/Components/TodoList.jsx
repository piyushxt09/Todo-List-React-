import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('Todos');
    if (storedUserData) {
        console.log(JSON.parse(storedUserData));
        setTodos(JSON.parse(storedUserData));
    }
}, []);

  const handleAddTodo = () => {
    if (headingInput.trim() !== '') {
      setTodos([...todos, { heading: headingInput, lists: [] }]);
      const Todos = [...todos, { heading: headingInput, lists: [] }];
      setHeadingInput('');
      const userData = JSON.stringify(Todos)
      sessionStorage.setItem('Todos', userData);
    }
  };
  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    const userData = JSON.stringify(newTodos)
    sessionStorage.setItem('Todos', userData);
  };

  const handleAddList = (index) => {
    if (listInputs[index] && listInputs[index].trim() !== '') {
      const newTodos = [...todos];
      newTodos[index].lists.push(listInputs[index]);
      setTodos(newTodos);
      setListInputs({ ...listInputs, [index]: '' });
      const userData = JSON.stringify(newTodos)
      sessionStorage.setItem('Todos', userData);
    }
  };

  const handleListInputChange = (index, value) => {
    setListInputs({ ...listInputs, [index]: value });
  };

  const handleDeleteList = (listIndex, index) => {
    const Lists = todos[index];
    const newTodos = [...todos];
    newTodos[index].lists.splice(listIndex, 1);
    setTodos(newTodos);
    const userData = JSON.stringify(newTodos)
    sessionStorage.setItem('Todos', userData);
  }



  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(e) => setHeadingInput(e.target.value)}
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, index) => (
          <div key={index} className="todo-card">
            <div className="heading_todo">
              <h3><u>{todo.heading}</u></h3>
              <button className="delete-button-heading" onClick={() => handleDeleteTodo(index)}>Delete Heading</button>
            </div>
            <ul>
              {todo.lists.map((list, listIndex) => (
                <li key={listIndex} className='todo_inside_list'>
                  <p>{list}</p>
                  <button onClick={() => handleDeleteList(listIndex, index)}>Delete</button>
                </li>
              ))}
            </ul>
            <div className='add_list'>
              <input
                type="text"
                className="list-input"
                placeholder="Add List"
                value={listInputs[index] || ''}
                onChange={(e) => handleListInputChange(index, e.target.value)}
              />
              <button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;