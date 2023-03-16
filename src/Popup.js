import React from "react";
import "./Popup.css";
import "./EditTask.css";
import { useState, useEffect, useRef } from "react";
import Subtask from "./Subtask";
import EditSubtask from "./EditSubtask";
import EditTask from "./EditTask";
import firebase from "firebase/compat/app";
import { doc, deleteDoc } from "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import DatePicker from "react-datepicker";
import Header from "./Header";
import { v4 as uuidv4 } from "uuid";

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
  const {
    userId,
    id,
    name,
    date,
    description,
    location,
    complete,
    trigger,
    setTrigger,
    editTaskOpen,
    setEditTaskOpen,
    fullDate,
  } = task2;
  const docRef = firestore.collection("tasks").doc(id).collection("subtasks");
  const [storedSubtasks] = useCollectionData(docRef);
  const [markComplete, setMarkComplete] = useState("");
  console.log(docRef);
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newLocation, setNewLocation] = useState(location);
  const [newDate, setNewDate] = useState();

  const [subtaskTitle, setSubtaskTitle] = useState(false);
  const [subtask, setSubtask] = useState(storedSubtasks);
  const [addSubtaskButton, setAddSubtaskButton] = useState(true);
  const [changedSubtask, setChangedSubtask] = useState([]);
  const [newSubtask, setNewSubtask] = useState();
  const [heldSubtasks, setHeldSubtasks] = useState([]);

  
  const [createdId, setCreatedId] = useState([]);


  console.log(heldSubtasks);
  console.log(newSubtask);
  console.log(storedSubtasks);

  useEffect(() => {
    setChangedSubtask(storedSubtasks);
    console.log(storedSubtasks);
  }, [storedSubtasks]);

  useEffect(() => {
    if (editTaskOpen) {
      if (storedSubtasks.length > 0) {
        for (let i = 0; i < storedSubtasks.length; i++) {
          if (storedSubtasks.length !== heldSubtasks.length) {
            heldSubtasks.push({
              name: storedSubtasks[i].name,
              id: storedSubtasks[i].id,
              complete: storedSubtasks[i].complete,
            });
          }
          console.log(newSubtask)
          if (newSubtask) {
          if (newSubtask.id === storedSubtasks[i].id) {
              heldSubtasks.splice(i, 1, {name: newSubtask.name, id: newSubtask.id, complete: newSubtask.complete})
            }
          }
        }
      

        //      
      }
    }
  }, [newSubtask, storedSubtasks, editTaskOpen]);
  
  useEffect(() => {
    if (heldSubtasks.length > 0) {
    for (let i = 0; i < heldSubtasks.length; i++) {
      // if(storedSubtasks.includes(createdId[i].id)){
        console.log(heldSubtasks[i].id)
      // }
    }
  }

    
    console.log(storedSubtasks)
    
  }, [heldSubtasks]);
  console.log(createdId);
  useEffect(() => {
    
      console.log('wow');
      console.log(createdId);
   
  }, [storedSubtasks]);

 

  const onChange = (index, e) => {
    console.log("WOO");
  };

  const handleRemoveSubtask = (e, index) => {
    e.preventDefault();

    setSubtask((prev) => prev.filter((item) => item !== prev[index]));

    console.log(subtask);
    if (subtask.length === 1) {
      setSubtaskTitle(false);
    }
  };

  const handleAddSubtask = (e) => {
    // e.preventDefault();
    // const inputState = {
    //   subtaskId: uuidv4(),
    //   Name: "",
    //   Complete: false,
    // };

    // setSubtaskTitle(true);

    
    //   setSubtask((prev) => [...prev, inputState]);
    //   console.log('run')
    

    // console.log('SEWEY')
    const subtaskId = uuidv4();
    docRef.doc(subtaskId).set({
      id: subtaskId,
      name: "",
      complete: false
    })

    createdId.push({
      id: subtaskId,
      name: "",
      complete: false
    })
    
    console.log('works')

  };
 



  const prevIsValid = () => {
    if (subtask.length === 0) {
      return true;
    }

    const someEmpty = subtask.some((item) => item.Name === "");

    if (someEmpty) {
      subtask.map((item, index) => {
        const allPrev = [...subtask];

        if (subtask[index].Name === "") {
          allPrev[index].errors.Name = "Subtask is required";
        }

        setSubtask(allPrev);
      });
    }

    return !someEmpty;
  };

  function SignOut() {
    return (
      auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
      )
    );
  }

  useEffect(() => {
    if (fullDate) {
      setNewDate(fullDate.toDate());
    }
  }, [fullDate]);

  console.log(storedSubtasks);

  useEffect(() => {
    if (complete) {
      setMarkComplete("Mark uncomplete");
    } else if (!complete) {
      setMarkComplete("Mark complete");
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
        complete: true,
      });
      setMarkComplete("Mark uncompleted");
    } else if (complete) {
      firestore.collection("tasks").doc(id).update({
        complete: false,
      });
      setMarkComplete("Mark completed");
    } else {
      console.log("error");
    }
  }

  function handleEditTask(id) {
    setEditTaskOpen(!editTaskOpen);
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
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const year = d.getFullYear();
    const date = d.getDate();
    const dayName = days[d.getDay()];
    const monthName = months[d.getMonth()];

    const formatted = `${dayName}, ${date} ${monthName} ${year}`;
    return formatted;
  }

  function updateTaskDetails() {
    firestore
      .collection("tasks")
      .doc(id)
      .update({
        name: newName,
        description: newDescription,
        location: newLocation,
        date: formatDate(newDate),
        fullDate: newDate,
      });

    for (let i = 0; i < heldSubtasks.length; i++) {
      firestore
        .collection("tasks")
        .doc(id)
        .collection("subtasks")
        .doc(heldSubtasks[i].id)
        .update({
          name: heldSubtasks[i].name,
        });
      console.log(heldSubtasks[i].name);
    }

    setEditTaskOpen(!editTaskOpen);
    setTrigger(!trigger);
  }

  function closePopup() {
    setTrigger(!trigger);
    setEditTaskOpen(!editTaskOpen);
  }

  useEffect(() => {
    var textarea = document.querySelector("textarea");

    if (editTaskOpen) {
      textarea.addEventListener("keydown", autosize);

      function autosize() {
        var el = this;
        setTimeout(function () {
          el.style.cssText = "height:auto; padding:0";
          // for box-sizing other than "content-box" use:
          // el.style.cssText = '-moz-box-sizing:content-box';
          el.style.cssText = "height:" + el.scrollHeight + "px";
        }, 0);
      }
    }
  }, [editTaskOpen]);

  return (
    <>
      {trigger && (
        <>
          {!editTaskOpen ? (
            <div className="popup-container">
              <div className="close-btn-container">
                <img
                  src="times.svg"
                  className="close-btn"
                  onClick={() => setTrigger(false)}
                />
              </div>
              <div className="tool-name">Task</div>
              <div className="popup-title">
                {name === "" ? "Untitled Task" : name}
              </div>
              <div className="date-container">
                <img className="delete-subtask-img" src="calendar-alt.svg" />
                <div className="popup-date">{date}</div>
              </div>
              {description && (
                <div className="description-container">
                  <img className="icon-image" src="subject.svg" />
                  <div>{description}</div>
                </div>
              )}
              {location && (
                <div className="location-container">
                  <img
                    className="delete-subtask-img"
                    src="location-point.svg"
                  />
                  <div>{location}</div>
                </div>
              )}
              {storedSubtasks.length > 0 && (
                <div className="subtask-popup-container">
                  <div className="subtask-title-container">
                    <img className="icon-image" src="clipboard-notes.svg" />
                    <div className="subtask-title">Subtasks</div>
                  </div>
                  <div className="subtask-list">
                    {storedSubtasks.map((subtask) => {
                      return (
                        <Subtask
                          key={subtask.id}
                          subtask={subtask}
                          documentId={id}
                        />
                      );
                    })}{" "}
                  </div>
                </div>
              )}
              <div className="btn-container">
                <div className="btn-inner-container-1">
                  <div
                    onClick={() => handleDeleteTask(id)}
                    className="btn-image-container"
                  >
                    <img className="btn-image" src="trash-alt-2.svg"></img>
                  </div>
                  <div
                    onClick={() => handleEditTask(id)}
                    className="btn-image-container"
                  >
                    <img className="btn-image" src="pen.svg"></img>
                  </div>
                </div>
                <div className="btn-inner-container-2">
                  <button
                    onClick={() => handleTaskComplete(id)}
                    className="btn-complete"
                  >
                    {markComplete}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="popup-container">
              <div className="close-btn-container">
                <img
                  src="times.svg"
                  className="close-btn"
                  onClick={closePopup}
                />
              </div>
              <div className="tool-name-container">
                <div className="tool-name">Task</div>
                <img className="tool-name-arrow" src="angle-right-b.svg"></img>
                <div className="tool-name">Edit task</div>
              </div>
              <input
                className="add-task-name"
                type="text"
                placeholder="Add title"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
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
                <textarea
                  rows="1"
                  placeholder="Add description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>

              <div className="location-container">
                <img className="delete-subtask-img" src="location-point.svg" />
                <input
                  className="add-task-location"
                  type="text"
                  placeholder="Add location"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </div>
              {storedSubtasks.length > 0 && (
                <>
                  <div className="inner">
                    <div className="subtask-title-container">
                      <img className="icon-image" src="clipboard-notes.svg" />
                      <div className="subtask-title">Subtasks</div>
                    </div>

                    {storedSubtasks.map((subtask, index) => (
                      <EditSubtask
                        key={subtask.id}
                        subtask={subtask}
                        documentId={id}
                        handleChange={(newSubtask) => setNewSubtask(newSubtask)}
                      />
                    ))}
                  </div>

                  {addSubtaskButton && (
                    <div className="add-subtask-btn-container">
                      <button
                        className="add-subtask-btn"
                        onClick={handleAddSubtask}
                      >
                        Add subtask
                      </button>
                    </div>
                  )}
                </>
              )}
              <div className="save-btn-container">
                <button className="save-btn" onClick={updateTaskDetails}>
                  SAVE
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
