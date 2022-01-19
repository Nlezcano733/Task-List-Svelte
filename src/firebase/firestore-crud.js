import { db } from './firebase';
import { collection, doc, addDoc, getDocs, deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";

export const addTask = async data => {
  try{
    const response = await addDoc(collection(db, "tasks"), data);
    return response.id
  } catch(e){
    console.error(e);
  }
}

export const getTasks = (callback) => {
  try {
    onSnapshot(collection(db, 'tasks'), snap => {
      let docs = [];
      snap.forEach(doc => docs.push({...doc.data(), id: doc.id}))
      
      callback(docs)
    })
  } catch(e){
    console.error(e)
  }
}

export const deleteTask = id => {
  try {
    deleteDoc(collection(db, "tasks", id))
    return true;
  } catch(e){
    console.error(e)
  }
}

export const updateTask = (id, data) => {
  try{
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, {
      status: data,
      modified: new Date()
    })
    return true;
  } catch (e){
    console.error(r)
  }
}