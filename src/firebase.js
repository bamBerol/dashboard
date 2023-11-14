// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhjsw9JhMcnbv7Ia-cURfBCxXoiXmnzYg",
  authDomain: "dashboard-c9d80.firebaseapp.com",
  databaseURL:
    "https://dashboard-c9d80-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dashboard-c9d80",
  storageBucket: "dashboard-c9d80.appspot.com",
  messagingSenderId: "924893637144",
  appId: "1:924893637144:web:98bebc31887ad2474db16d",
  measurementId: "G-69FBR46ZBK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
