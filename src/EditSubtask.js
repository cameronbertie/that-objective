import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { doc, updateDoc } from "firebase/compat/firestore";
import './Subtask.css';
firebase.initializeApp({
  apiKey: "AIzaSyDxTLgnuty0YnBxe6WWrclMbpfRSEpcG_8",
  authDomain: "thatobjective.firebaseapp.com",
  projectId: "thatobjective",
  storageBucket: "thatobjective.appspot.com",
  messagingSenderId: "246774427670",
  appId: "1:246774427670:web:d766a8c15681cd29050537",
});
const firestore = firebase.firestore();

export default function EditSubtask({ subtask, documentId, handleChange }) {
    const { name, complete, id} = subtask;

    const [newName, setNewName] = useState(name);
    console.log(newName);
    console.log(id);

    function handleDeleteSubtask() {
        firestore.collection("tasks").doc(documentId).collection('subtasks').doc(id).delete();
        console.log(id);
    }


    useEffect(() => {
      handleChange({id: id, name: newName, complete: complete});
  }, [newName]);



  return (
    <div className="subtask-container">
            <input
            className="subtask-input"
              placeholder="Add subtask name"
              type="text"
              name="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
  
            <img className="delete-subtask-img" src="trash-alt.svg" onClick={() => handleDeleteSubtask()} />
          </div>
  )
}


