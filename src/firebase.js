// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyB8dOBw8LiUfC36dJ-EpzxW19Cz9whpww4',
  authDomain: 'e-commerce-951ae.firebaseapp.com',
  databaseURL: 'https://e-commerce-951ae.firebaseio.com',
  projectId: 'e-commerce-951ae',
  storageBucket: 'e-commerce-951ae.appspot.com',
  messagingSenderId: '389295777485',
  appId: '1:389295777485:web:623f9935be10822db52b84',
  measurementId: 'G-1LGGFDMRQV',
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { fb, db };
