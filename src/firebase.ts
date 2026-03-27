import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCgftEyIeervhwHib143mLl5jsqAMZHNWU",
  authDomain: "tradeapp-custom.firebaseapp.com",
  projectId: "tradeapp-custom",
  storageBucket: "tradeapp-custom.appspot.com",
  messagingSenderId: "530622537519",
  appId: "1:530622537519:web:f3bd8eac8968c850740bda",
  measurementId: "G-XGKJ3L0ZV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Auth helpers
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);

// Safe analytics (prevents crash in Vite/SSR)
let analytics: any = null;

if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };