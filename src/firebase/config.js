import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: 'AIzaSyBUDef8pqdCmuBjC2dMVAh88wyfVjdse2s',
    authDomain: 'ninja-login-cd5a9.firebaseapp.com',
    projectId: 'ninja-login-cd5a9',
    storageBucket: 'ninja-login-cd5a9.appspot.com',
    messagingSenderId: '81998463504',
    appId: '1:81998463504:web:2464e6fa5d5fa34db1c095',
};

//init firebase
const app = initializeApp(firebaseConfig);

//init firestore

const db = getFirestore();

const auth = getAuth();

export { db, auth };
