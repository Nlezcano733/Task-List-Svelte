import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxTx6uZt7IBPuBuolNKAzDlJKQHEhqtYc",
  authDomain: "tasklist-svelte.firebaseapp.com",
  projectId: "tasklist-svelte",
  storageBucket: "tasklist-svelte.appspot.com",
  messagingSenderId: "2464526879",
  appId: "1:2464526879:web:b8cdef611c3ba8c1b35b2a"
};

export default initializeApp(firebaseConfig);
export const db = getFirestore() 