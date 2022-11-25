import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1bQ6k3WIWHKa5eEynRA6mzixqXOSDYH0",
  authDomain: "cyberstream-9523f.firebaseapp.com",
  projectId: "cyberstream-9523f",
  storageBucket: "cyberstream-9523f.appspot.com",
  messagingSenderId: "289228393457",
  appId: "1:289228393457:web:cddf50c9a6bc93bea3d250",
  measurementId: "G-RZ8LDRX4P6",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseapp);
const auth = firebase.auth();

export { auth, firestore };
