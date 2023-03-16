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


export default function Subtask({ subtask, documentId }) {
  const { name, complete, id } = subtask;
  

  // useEffect(() => {
  //   if (complete === true) {
  //     document.getElementById("myCheck").checked = true;
  //     console.log(complete)
  //   } else if (complete === false) {
  //     document.getElementById("myCheck").checked = false;
  //     console.log(complete)
  //   }
  // }, []);

  // const selectShortlistedApplicant = (e) => {
  //   let checked = e.target.checked;

  //   if (checked) {
  //     const docRef = firestore
  //       .collection("tasks")
  //       .doc(documentId)
  //       .collection("subtasks")
  //       .doc(id);
  //     return docRef.update({
  //       complete: true,
  //     });
  //   } else if (!checked) {
  //     const docRef = firestore
  //       .collection("tasks")
  //       .doc(documentId)
  //       .collection("subtasks")
  //       .doc(id);
  //     return docRef.update({
  //       complete: false,
  //     });
  //   } else {
  //     console.log("error");
  //   }
  //   if (complete === true) {
  //     console.log("true");
  //   } else if (complete === false) {
  //     console.log("false");
  //   }
  // };

  // useEffect( () => {
  //   async if (checkSubtask) {
  //     const docRef = firestore
  //       .collection("tasks")
  //       .doc(documentId)
  //       .collection("subtasks")
  //       .doc(id);
  //     return docRef.update({
  //       complete: true,
  //     });
  //   } else if (!checkSubtask) {
  //     const docRef = firestore
  //       .collection("tasks")
  //       .doc(documentId)
  //       .collection("subtasks")
  //       .doc(id);
  //     return docRef.update({
  //       complete: false,
  //     });
  //   } else {
  //     console.log("error");
  //   }
  // }, [checkSubtask]);

  function handleSubtaskComplete(id) {
console.log("this works")
    if (!complete) {
      const docRef = firestore
      .collection("tasks")
      .doc(documentId)
      .collection("subtasks")
      .doc(id);
    return docRef.update({
      complete: true,
    });
    

  } else if (complete) {
    const docRef = firestore
        .collection("tasks")
        .doc(documentId)
        .collection("subtasks")
        .doc(id);
      return docRef.update({
        complete: false,
      })
    ;
        
  } else {
    console.log("error");
  }

}

function handleDeleteSubtask() {
  firestore.collection("tasks").doc(documentId).collection('subtasks').doc(id).delete();
  console.log(id);
}

  return (
    <div className="subtask-name">
      <div className="subtask-name-content" onClick={() => handleSubtaskComplete(id)}>
      {/* <input
        id="myCheck"
        defaultChecked={complete}
        type="checkbox"
        onClick={(e) => {
          selectShortlistedApplicant(e);
        }}
        
      ></input> */}
      
      <div className="name-container">
      {complete ?
      <img className="icon-image" src="check-circle.svg" />
      : <img className="icon-image" src="circle.svg" />
      }
      <div   className="subtask-text" style={{ textDecoration: complete ? 'line-through': 'none'}}>{name}</div>
      </div>
      
      </div>
      
      <img className="delete-subtask-img" src="trash-alt.svg" onClick={() => handleDeleteSubtask()}/>
      
    </div>
  );
}
