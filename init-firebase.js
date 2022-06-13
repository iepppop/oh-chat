import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB2jvmz6hs18YhHNJttU1d0Hm-g5XvyilE",
  authDomain: "twt-project-4c14a.firebaseapp.com",
  projectId: "twt-project-4c14a",
  storageBucket: "twt-project-4c14a.appspot.com",
  messagingSenderId: "244930577533",
  appId: "1:244930577533:web:06162f34f25ef8327d5d14",
  measurementId: "G-LCQEYZPR6N"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage();