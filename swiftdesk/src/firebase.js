// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgb8fIs4QYfkmcEUAdUKOHlb8eLws5Pro",
  authDomain: "swiftdesk-67ad8.firebaseapp.com",
  projectId: "swiftdesk-67ad8",
  storageBucket: "swiftdesk-67ad8.firebasestorage.app",
  messagingSenderId: "513588911430",
  appId: "1:513588911430:web:d38570f42dee2845d35947",
  measurementId: "G-0ZNY3PQL8K"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);