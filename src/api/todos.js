import db from "../firebase";
import {
  ref,
  set,
  child,
  get,
  update,
  remove,
  push,
} from "firebase/database";

const todosRef = ref(db, "todos");

const getTodos = async () => {

  const snapshot = await get(todosRef);
  if (snapshot.exists()) {
    // return Object.values(snapshot.val());
    return snapshot.val();
  }
  return {};
};

const addTodo = async (todo) => {
  const res = await push(todosRef, todo);
  return res.key;
};

const updateTodo = async (key, todo) => {
  const todoRef = ref(db, `todos/${key}`)
  await set(todoRef, todo)
};

const deleteTodo = async (key) => {
  const todoRef = ref(db, `todos/${key}`)
  await remove(todoRef)
}

const todosAPI = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};

export default todosAPI;
