// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDIpydgobwRZJ5LqsDJwL8S0qj8MPaVkmI",
  authDomain: "demo55-efd39.firebaseapp.com",
  projectId: "demo55-efd39",
  storageBucket: "demo55-efd39.appspot.com",
  messagingSenderId: "837251536488",
  appId: "1:837251536488:web:49f23c49e0c1c04b4d0ddd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);//it gives firebases real time database object.
export const auth=getAuth();//it gives authentication object..which gives access this firebase which we are connected.

/*
 {
  "rules": {
    ".read": "now < 1658601000000",  // 2022-7-24
    ".write": "now < 1658601000000",  // 2022-7-24
  }
} 
 */