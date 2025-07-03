// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTYkHyTMCByDheXQ-uBAhXWvyoalLmFrM",
  authDomain: "neonotes-f34f8.firebaseapp.com",
  projectId: "neonotes-f34f8",
  storageBucket: "neonotes-f34f8.firebasestorage.app",
  messagingSenderId: "592781512698",
  appId: "1:592781512698:web:36ea72583801c166c11e43"
};

// Initialize Firebase
const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const db =  getFirestore(app);

export { db };