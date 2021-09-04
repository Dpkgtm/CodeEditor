import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export  const auth=firebase.initializeApp({
    apiKey: "AIzaSyDCcjvQUpuMBMVQHWhyCQwN5LEGXVL669s",
    authDomain: "onlinecode-e293a.firebaseapp.com",
    projectId: "onlinecode-e293a",
    storageBucket: "onlinecode-e293a.appspot.com",
    messagingSenderId: "834011800902",
    appId: "1:834011800902:web:663427c12d5dd757fdf147"
}).auth();