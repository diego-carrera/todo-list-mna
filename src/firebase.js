
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBp8_c7YxhUgQ6bg9CFBy2n8I0PqGOyttc",
  authDomain: "tc4016-todos.firebaseapp.com",
  databaseURL: "https://tc4016-todos-default-rtdb.firebaseio.com",
  projectId: "tc4016-todos",
  storageBucket: "tc4016-todos.appspot.com",
  messagingSenderId: "519060611098",
  appId: "1:519060611098:web:95b1abddbd041e361a71a3",
  measurementId: "G-1T13T58NJJ",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
// export default firebaseApp;
export default db;

