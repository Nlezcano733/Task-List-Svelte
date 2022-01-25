import { db } from './firebase';
import { collection, doc, addDoc, getDocs, deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";

export const addTask = async data => {
  try {
    const response = await addDoc(collection(db, "tasks"), data);
    return response.id
  } catch (e) {
    console.error(e);
  }
}

export const getTasks = (callback, user) => {
  try {
    onSnapshot(collection(db, 'tasks'), snap => {
      let docs = [];
      snap.forEach(doc => docs.push({ ...doc.data(), id: doc.id }))

      docs = docs.filter(d => d.uid === user);
      callback(docs)
    })
  } catch (e) {
    console.error(e)
  }
}

export const deleteTask = id => {
  try {
    const ref = doc(db, 'tasks', id)
    deleteDoc(ref)
    return true;
  } catch (e) {
    console.error(e)
  }
}

export const deleteCollection = (user) => {
  try {
    getTasks((data) => {
      data
        ?.forEach(d => deleteTask(d?.id))
    }, user)
  } catch (e) {
    console.error(e)
  }
}

export const updateTask = async (id, data) => {
  try {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, {
      status: data,
      modified: new Date()
    })
    return true;
  } catch (e) {
    console.error(e)
  }
}