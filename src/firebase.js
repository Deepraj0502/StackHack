// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);
const storage = getStorage(app);
export { db, auth, signInWithGooglePopup, storage };
