// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage"
import { Firestore, addDoc, collection, deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBMHHaZWy1oZhveAyoj-jQ0_yoKvnzop_c",

  authDomain: "oysterestate-d61f1.firebaseapp.com",

  projectId: "oysterestate-d61f1",

  storageBucket: "oysterestate-d61f1.appspot.com",

  messagingSenderId: "230142385987",

  appId: "1:230142385987:web:5a30b6e707a0ed8b9959f6"

};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp
export const auth = getAuth()
export const storage = getStorage(app)
export const db = getFirestore(app)
