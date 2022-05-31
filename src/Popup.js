import React from "react";
import "./Popup.css";
import './EditTask.css'
import {useState, useEffect, useRef } from "react";
import Subtask from "./Subtask";
import EditTask from "./EditTask";
import firebase from "firebase/compat/app";
import { doc, deleteDoc } from "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import DatePicker from "react-datepicker";
import Header from './Header'

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

export default function Popup(task2) {
  const { userId, id, name, date, description, location, complete, trigger, setTrigger, editTaskOpen, setEditTaskOpen, fullDate } = task2;
  const docRef = firestore.collection("tasks").doc(id).collection("subtasks");
  const [storedSubtasks] = useCollectionData(docRef);
  const [markComplete, setMarkComplete] = useState("");

  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newLocation, setNewLocation] = useState(location);
  const [newDate, setNewDate] = useState();
  
  
  useEffect(() => {
    if (fullDate) {
      setNewDate(fullDate.toDate());
    }
   }, [fullDate]);
  
  console.log(storedSubtasks);
  
   useEffect(() => {
    if (complete) {
      setMarkComplete("Mark uncomplete")
    } else if (!complete) {
      setMarkComplete("Mark complete")
    }
   }, []);

  //  useEffect(() => {
  // if (editTaskOpen) {
  //   setNewDate(fullDate.toDate())
  // }
  //  }, [editTaskOpen]);

  function handleDeleteTask(id) {
    firestore.collection("tasks").doc(id).delete();
    console.log(id);
  }

  function handleTaskComplete(id) {

    if (!complete) {
    firestore.collection("tasks").doc(id).update({
      complete: true
    });
    setMarkComplete("Mark uncompleted")
  } else if (complete) {
    firestore.collection("tasks").doc(id).update({
          complete: false
        });
        setMarkComplete("Mark completed")
  } else {
    console.log("error");
  }

}

function handleEditTask(id) {
  setEditTaskOpen(!editTaskOpen)
}

function formatDate(chosenDate) {
  const d = chosenDate;
  

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  
  const year = d.getFullYear();
  const date = d.getDate();
  const dayName = days[d.getDay()]
  const monthName = months[d.getMonth()];


  const formatted = `${dayName}, ${date} ${monthName} ${year}`
  return formatted;

}

function updateTaskDetails() {
  firestore.collection("tasks").doc(id).update({
    name: newName,
    description: newDescription,
    location: newLocation,
    date: formatDate(newDate),
    fullDate: newDate
  });
  setEditTaskOpen(!editTaskOpen);
  setTrigger(!trigger);
}

function closePopup() {
  setTrigger(!trigger);
  setEditTaskOpen(!editTaskOpen);
}

useEffect(() => {
  var textarea = document.querySelector('textarea');

  if (editTaskOpen) {
  textarea.addEventListener('keydown', autosize);
               
  function autosize(){
    var el = this;
    setTimeout(function(){
      el.style.cssText = 'height:auto; padding:0';
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    },0);
  }
}
}, [editTaskOpen]);




  return (
    <>
   {trigger &&
   <>
   { !editTaskOpen ?
    <div className="popup-container">
       <div className="close-btn-container"><img src="times.svg" className="close-btn" onClick={() => setTrigger(false)} /></div>
       <div className="tool-name">Task</div>
      <div className="popup-title">{name === "" ? "Untitled Task": name}</div>
      <div className="date-container">
      <img className="delete-subtask-img" src="calendar-alt.svg" />
      <div className="popup-date">{date}</div>
      </div>
      {description &&
      <div className="description-container">
      <img className="icon-image" src="subject.svg" />
        <div>{description}</div>
        </div>
      }
      {location &&
      <div className="location-container">
      <img className="delete-subtask-img" src="location-point.svg" />
      <div>{location}</div>
      </div>
      } 
      {storedSubtasks.length > 0 && 
      <div className="subtask-popup-container">
        <div className="subtask-title-container">
        <img className="icon-image" src="clipboard-notes.svg" />
        <div className="subtask-title">Subtasks</div>
        </div>
        <div className="subtask-list">
        {
       storedSubtasks.map(subtask =>{
          return <Subtask key={subtask.id} subtask={subtask} documentId={id}/>
        })
      } </div>
      </div>
        }
        <div className="btn-container">
        <div className="btn-inner-container-1">
      <div onClick={() => handleDeleteTask(id)} className="btn-image-container">
        <img  className="btn-image" src="trash-alt-2.svg"></img>
        </div>
      <div onClick={() => handleEditTask(id)} className="btn-image-container">
        <img  className="btn-image" src="pen.svg"></img>
        </div>
        </div>
        <div className="btn-inner-container-2">
        <button onClick={() => handleTaskComplete(id)} className="btn-complete">{markComplete}</button>
      </div>
    </div>
    
    </div>
    :
    <div className="popup-container">
    <div className="close-btn-container"><img src="times.svg" className="close-btn" onClick={closePopup} /></div>
    <div className="tool-name-container"><div className="tool-name">Task</div><img className="tool-name-arrow" src="angle-right-b.svg"></img><div className="tool-name">Edit task</div></div>
    <input  className="add-task-name" type="text" placeholder="Add title" value={newName} onChange={(e) => setNewName(e.target.value)}/>
    <div className="date-container">
      <img className="delete-subtask-img" src="calendar-alt.svg" />
    <DatePicker
      dateFormat="eeee, d MMMM yyyy"
      locale="enGB"
      selected={newDate}
      selectsStart
      onChange={(date) => setNewDate(date)}
      className="add-task-date"
    />
    </div>
    <div className="description-container">
   <img className="icon-image" src="subject.svg" />
    <textarea rows='1' placeholder="Add description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
    
    </div>

    <div className="location-container">
      <img className="delete-subtask-img" src="location-point.svg" />
    <input  className="add-task-location" type="text" placeholder="Add location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}/>
    </div>
    <div className="save-btn-container"><button className="save-btn" onClick={updateTaskDetails}>SAVE</button></div>
  </div>
}
</>
}
        </>
  );
    }