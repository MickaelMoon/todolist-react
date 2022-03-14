import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const todoCollectionRef = collection(db, "todos");
class TodoDataService {
  addTodos = (newTodo) => {
    return addDoc(todoCollectionRef, newTodo);
  };
  updateTodo = (id, updatedTodo) => {
    const todoDoc = doc(db, "todos", id);
    return updateDoc(todoDoc, updatedTodo);
  };
  deleteTodo = (id) => {
    const todoDoc = doc(db, "todos", id);
    return deleteDoc(todoDoc);
  };

  getAllTodos = () => {
    return getDocs(todoCollectionRef);
  };

  getTodo = (id) => {
    const todoDoc = doc(db, "todos", id);
    return getDoc(todoDoc);
  };
}

export default new TodoDataService();
