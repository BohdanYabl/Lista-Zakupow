// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnH4IAi-eibkM9jmvLMVboc7cEsSXh0no",
  authDomain: "lista-bcf22.firebaseapp.com",
  projectId: "lista-bcf22",
  storageBucket: "lista-bcf22.firebasestorage.app",
  messagingSenderId: "949833365998",
  appId: "1:949833365998:web:a95d99d6f59f449b2df6ff",
  measurementId: "G-0W23S8MB6Z",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
