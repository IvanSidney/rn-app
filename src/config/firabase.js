import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBEmIBP8P68P9roLkeADudDTuMuMtg9nUQ",
    authDomain: "initial-4b2a8.firebaseapp.com",
    databaseURL: "https://initial-4b2a8-default-rtdb.firebaseio.com",
    projectId: "initial-4b2a8",
    storageBucket: "initial-4b2a8.appspot.com",
    messagingSenderId: "9960921939",
    appId: "1:9960921939:web:d6aecc4584e24149a7dfa6",
    measurementId: "G-X1W0JSEKB9",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
