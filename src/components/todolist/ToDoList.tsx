import type { ClassNames } from "@emotion/react";
import { ArrowArcRightIcon, ArrowRightIcon, BulldozerIcon, ListBulletsIcon, MinusCircleIcon, PlusCircleIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // Load TODOs from local storage on app startup
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Update local storage whenever TODOs change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      setTodos([...todos, task]);
      setTask('');
    }
  };

  const handleRemoveTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="p-4">
      <header className="App-header">
        <h1 className="text-2xl">Anotações: </h1>
        <div className="p-2">
          <input
            type="text"
            placeholder="Adicionar anotação"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-3/4 content-center border-b"
          />
          <button onClick={handleAddTodo} className="p-2"><PlusCircleIcon size={32}/> </button>
        </div>
        <ul className="p-2">
          {todos.map((todo, index) => (
            <li key={index} className="flex items-center">
                <span>{todo}</span>
                <button className="ps-2" onClick={() => handleRemoveTodo(index)}><MinusCircleIcon size={32} /> </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}
export default ToDoList