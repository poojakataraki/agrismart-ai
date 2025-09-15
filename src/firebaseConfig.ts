// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAo45VK_wwDDlzXvgKhBENIfdfl282EalI",
  authDomain: "agrismartai-22d49.firebaseapp.com",
  projectId: "agrismartai-22d49",
  storageBucket: "agrismartai-22d49.firebasestorage.app",
  messagingSenderId: "233616615425",
  appId: "1:233616615425:web:eec08bbbb64d71a93fb800"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
