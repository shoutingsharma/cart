import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuDGmYJ5vVlqPyyoKYXj8Ko2kkRoeT4yk",
  authDomain: "cart-b28a6.firebaseapp.com",
  projectId: "cart-b28a6",
  storageBucket: "cart-b28a6.appspot.com",
  messagingSenderId: "403235674353",
  appId: "1:403235674353:web:f363b88c48d010296f3150"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


