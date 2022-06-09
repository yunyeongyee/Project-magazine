// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyAA7vhNxIGH-2SzpnDC5MT5IeaBmFvknxA',
   authDomain: 'sparta-react-magazine.firebaseapp.com',
   projectId: 'sparta-react-magazine',
   storageBucket: 'sparta-react-magazine.appspot.com',
   messagingSenderId: '933283731826',
   appId: '1:933283731826:web:878e0e2f0f07bcd7ede5eb',
   measurementId: 'G-YY8XN1BQ6W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;