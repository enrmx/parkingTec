// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoobx_N_x0iRuxio46Q0Nmq1eCddGiSuI",
  authDomain: "kawiri-f62d3.firebaseapp.com",
  projectId: "kawiri-f62d3",
  storageBucket: "kawiri-f62d3.appspot.com",
  messagingSenderId: "583473373995",
  appId: "1:583473373995:web:2bdd4f58838820510f1b6e",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };