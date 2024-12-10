import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDboGN88QdxoEAyIDv3O-d6-aFkLVlMAQc",
  authDomain: "webdev-habit-tracker.firebaseapp.com",
  projectId: "webdev-habit-tracker",
  storageBucket: "webdev-habit-tracker.firebasestorage.app",
  messagingSenderId: "855933218071",
  appId: "1:855933218071:web:2a0c30a2e4b8ea7ca4db52",
  measurementId: "G-BYLDQQMZTN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, firestore, googleProvider };
