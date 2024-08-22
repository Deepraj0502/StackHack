// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB4NxRT9SXOxWy4sIAg05W-fM-4tGo8bE",
  authDomain: "stackhackathon.firebaseapp.com",
  projectId: "stackhackathon",
  storageBucket: "stackhackathon.appspot.com",
  messagingSenderId: "671776473219",
  appId: "1:671776473219:web:da9df04d2718f728ff5bb6",
  measurementId: "G-ZHZCR0BT03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
