// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeY4ASHBq1nOOAyf_oBWkoMb3wVJJyC1M",
  authDomain: "fir-auth-7cecd.firebaseapp.com",
  projectId: "fir-auth-7cecd",
  storageBucket: "fir-auth-7cecd.appspot.com",
  messagingSenderId: "134812368413",
  appId: "1:134812368413:web:a423369706fb35804c90f4"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
