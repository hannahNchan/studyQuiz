import React from 'react';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyChkWfKup4GfQ9pp9uUQCZ44Hh--vkGcu4",
  authDomain: "appstudy-da84d.firebaseapp.com",
  databaseURL: "https://appstudy-da84d.firebaseio.com",
  projectId: "appstudy-da84d",
  storageBucket: "appstudy-da84d.appspot.com",
  messagingSenderId: "149577763979",
  appId: "1:149577763979:web:922f2f9dd4f2f62711d88e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
