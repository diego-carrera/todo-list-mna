// import logo from './logo.svg';
// import './App.css';

import React from "react";
import { nanoid } from "nanoid";

import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";

const FILTER_MAP = {
  Todas      : () => true,
  Activas    : task => task && !task.completed,
  Completadas: task => task && task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {

  const [tasks, setTasks] = React.useState(() => {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [filter, setFilter] = React.useState('Todas');

  const taskNoun = tasks.length !== 1 ? 'tareas' : 'tarea';
  const headingText = `${tasks.length} ${taskNoun} pendientes`;

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}` + tasks.length, name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if(id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if(id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  return (
    <div className="todoapp stack-large">
      <h1>MNA Todo Tasker</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
