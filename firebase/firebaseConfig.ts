import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBoS_uGbPJqAam8jRS3lJcdFu2jy3q-xZ0",
  authDomain: "movienightfinderfinal.firebaseapp.com",
  projectId: "movienightfinderfinal",
  storageBucket: "movienightfinderfinal.firebasestorage.app",
  messagingSenderId: "426525489504",
  appId: "1:426525489504:web:cb8ae08c6fce3cee1fc605",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);