import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQhYFvqWbDjFU8zcEiY0jRvWv4bE7aNl0",
  authDomain: "gym-notes-84618.firebaseapp.com",
  projectId: "gym-notes-84618",
  storageBucket: "gym-notes-84618.firebasestorage.app",
  messagingSenderId: "726002077873",
  appId: "1:726002077873:web:a68f94e065edd0313a1290",
  measurementId: "G-F4GSPZVHHQ",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

let firestoreDb: Firestore;
try {
  firestoreDb = initializeFirestore(firebaseApp, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  });
} catch {
  firestoreDb = getFirestore(firebaseApp);
}

export const db = firestoreDb;
