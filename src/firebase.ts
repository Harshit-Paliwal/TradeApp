<<<<<<< HEAD
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import the Firebase configuration
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

// Auth helpers
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);
=======
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';


// // Import the Firebase configuration
// import firebaseConfig from '../firebase-applet-config.json';

// // Initialize Firebase SDK
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase services
// export const auth = getAuth(app);
// export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
// export const googleProvider = new GoogleAuthProvider();

// // Auth helpers
// export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
// export const logout = () => signOut(auth);


// Firebase core
import { initializeApp } from "firebase/app";

// Firebase services
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// ✅ Your Firebase configuration (merged here directly)
const firebaseConfig = {
  apiKey: "AIzaSyCgftEyIeervhwHib143mLl5jsqAMZHNWU",
  authDomain: "tradeapp-custom.firebaseapp.com",
  projectId: "tradeapp-custom",
  storageBucket: "tradeapp-custom.appspot.com", // ✅ fixed
  messagingSenderId: "530622537519",
  appId: "1:530622537519:web:f3bd8eac8968c850740bda",
  measurementId: "G-XGKJ3L0ZV2"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ fixed (removed firestoreDatabaseId)
export const googleProvider = new GoogleAuthProvider();

// ✅ Auth helpers
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);

// ✅ Safe Analytics (works with Next.js / Netlify)
let analytics = null;

if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
>>>>>>> f75c812 (Initial commit - Firebase setup and fixes)
