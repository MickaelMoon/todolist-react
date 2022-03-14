import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCYMRHYif9-i2kbZfRQNOwEQshCa753S7g",
  authDomain: "todo-list-react-moon.firebaseapp.com",
  projectId: "todo-list-react-moon",
  storageBucket: "todo-list-react-moon.appspot.com",
  messagingSenderId: "740204483912",
  appId: "1:740204483912:web:43f257c072e5f03dc78f7d",
  measurementId: "G-6T6B9JDJMB",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
