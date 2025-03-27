import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc 
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyAgb8fIs4QYfkmcEUAdUKOHlb8eLws5Pro",
  authDomain: "swiftdesk-67ad8.firebaseapp.com",
  projectId: "swiftdesk-67ad8",
  storageBucket: "swiftdesk-67ad8.appspot.com",
  messagingSenderId: "513588911430",
  appId: "1:513588911430:web:d38570f42dee2845d35947",
  measurementId: "G-0ZNY3PQL8K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

export { 
  auth, 
  db, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  setDoc, 
  doc 
};
