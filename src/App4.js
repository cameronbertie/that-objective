import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Header from "./Header"
import Timeline from "./Timeline";
import SignIn from "./SignIn";

firebase.initializeApp({
  apiKey: "AIzaSyDxTLgnuty0YnBxe6WWrclMbpfRSEpcG_8",
  authDomain: "thatobjective.firebaseapp.com",
  projectId: "thatobjective",
  storageBucket: "thatobjective.appspot.com",
  messagingSenderId: "246774427670",
  appId: "1:246774427670:web:d766a8c15681cd29050537",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
export default function App4() {

const [user] = useAuthState(auth);


  return (
    <div>
      
      <section>{user ? <Timeline /> : <SignIn />}</section>
    </div>
  );
}
