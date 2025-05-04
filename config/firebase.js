import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

//production
const firebaseConfig = {
    apiKey: "AIzaSyApFQpm1e417y8JqQZokzqVl72g0UCjlXM",
    authDomain: "u-mind-83802.firebaseapp.com",
    projectId: "u-mind-83802",
    storageBucket: "u-mind-83802.appspot.com",
    messagingSenderId: "130397483356",
    appId: "1:130397483356:web:f8dc7c163c18443b621199",
    measurementId: "G-1WRF48L1JW"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const realtimeDB = getDatabase(app);
