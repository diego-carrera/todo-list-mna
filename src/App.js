// import logo from './logo.svg';
// import './App.css';

import React from "react";

import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import todosAPI from "./api/todos";
import categoriesAPI from "./api/categories";


const FILTER_MAP = {
  Todas      : () => true,
  Activas    : task => task && !task.completed,
  Completadas: task => task && task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {

  const [tasks, setTasks] = React.useState({});
  const [categories, setCategories] = React.useState({});
  const [pendingTasks, setPendingTasks] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      const todos = await todosAPI.getTodos();
      setTasks(todos);
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const categories = await categoriesAPI.getCategories();
      setCategories(categories);
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const pendingTasks = Object.keys(tasks).filter(key => !tasks[key].completed).length;
    setPendingTasks(pendingTasks);
  }, [tasks]);

  const [filter, setFilter] = React.useState('Todas');

  const taskNoun = tasks.length !== 1 ? 'tareas' : 'tarea';
  const headingText = `${pendingTasks} ${taskNoun} pendientes`;

  const taskList = Object.keys(tasks)
  .filter(key => FILTER_MAP[filter](tasks[key]))
  .map(key => (
    <Todo
      key={key}
      id={key}
      name={tasks[key].name}
      category={tasks[key].category}
      completed={tasks[key].completed}
      categories={categories}
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

  async function addTask(name, category) {
    const newTask = { name: name, completed: false, category: category };
    const key = await todosAPI.addTodo(
      newTask
    );
    setTasks({...tasks, [key]: newTask});
  }

  async function toggleTaskCompleted(key) {
    // get the task from the state
    const task = tasks[key];
    task.completed = !task.completed;
    // update the task in the database
    await todosAPI.updateTodo(
      key,
      task
    );
    // update the task in the state
    setTasks({...tasks, [key]: task});
  }

  async function deleteTask(key) {
    // remove the task from the database
    await todosAPI.deleteTodo(key);

    // remove the task from the state
    const newTasks = {...tasks};
    delete newTasks[key];
    setTasks(newTasks);

  }

  async function editTask(key, newName, newCategory) {
    const task = tasks[key];
    task.name = newName;
    task.category = newCategory;

    await todosAPI.updateTodo(
      key,
      task
    );

    setTasks({...tasks, [key]: task});
  }

  return (
    <div className="todoapp stack-large">
      <h1>MNA Todo Tasker</h1>
      <Form addTask={addTask} categories={categories}/>
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
