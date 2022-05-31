
import React, {useState, useEffect, useRef} from 'react';
import firebase from 'firebase/compat/app';
import {doc, deleteDoc} from 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Popup from './Popup'
import './Task.css'

firebase.initializeApp({
  apiKey: "AIzaSyDxTLgnuty0YnBxe6WWrclMbpfRSEpcG_8",
  authDomain: "thatobjective.firebaseapp.com",
  projectId: "thatobjective",
  storageBucket: "thatobjective.appspot.com",
  messagingSenderId: "246774427670",
  appId: "1:246774427670:web:d766a8c15681cd29050537"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Task({task2}) {

  // const [isOpen, setIsOpen] = useState(false);
  const ref = useRef()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const {userId, id, name, date, description, location, subtasks, complete, fullDate} = task2;
console.log(isMenuOpen);
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false)
        setEditTaskOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isMenuOpen])

  useEffect(() => {
    console.log("alien")
  }, [complete]);

  useEffect(() => {
    console.log(isMenuOpen)
  }, []);

  

   const togglePopup = () => {
     setIsMenuOpen(true);
   }

  

  
  return (
    <>
    <div onClick={togglePopup}>
        <div className="task-container" style={{ textDecoration: complete ? 'line-through': 'none', opacity: complete ? '0.3': '1'}}>{name === "" ? "Untitled Task": name}</div>
    </div>
    
    <div ref={ref}>
    <Popup id={id} name={name} date={date} description={description} location={location} subtasks={subtasks} complete={complete} trigger={isMenuOpen} setTrigger={setIsMenuOpen} editTaskOpen={editTaskOpen} setEditTaskOpen={setEditTaskOpen} fullDate={fullDate}  />
    </div>
    </>
  )
}

