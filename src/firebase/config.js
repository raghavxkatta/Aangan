// src/firebase/config.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

// ✅ Use your values below from the screenshot
const firebaseConfig = {
    apiKey: "AIzaSyAFBSIUm1mn_QXLHcIP4mFOs6ii-PMKvao",
    authDomain: "aangan-9f566.firebaseapp.com",
    projectId: "aangan-9f566",
    storageBucket: "aangan-9f566.firebasestorage.app",
    messagingSenderId: "773650860128",
    appId: "1:773650860128:web:a205584dfb350ecf569b05",
    measurementId: "G-P3EMCPY1HX"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore services

export const auth = getAuth(app);
export const db = getFirestore(app);
