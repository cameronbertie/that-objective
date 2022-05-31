import React from 'react'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}

export default function SignIn() {


    const [user] = useAuthState(auth);

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}
