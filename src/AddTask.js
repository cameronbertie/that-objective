import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-gb";
import "react-datepicker/dist/react-datepicker.css";
import TaskList from "./TaskList";
import { format } from "date-fns";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { v4 as uuidv4 } from "uuid";
import { id } from "date-fns/locale";
import './AddTask.css'

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

registerLocale("en-gb", enGB);


export default function AddTask(props) {
    const { trigger, setTrigger } = props;
    const [day1, setDay1] = useState(0);
    const [day2, setDay2] = useState(1);
    const [day3, setDay3] = useState(2);
    const [day4, setDay4] = useState(3);
    const [day5, setDay5] = useState(4);
    const todoNameRef = useRef();
    const todoDescriptionRef = useRef();
    const todoLocationRef = useRef();
    const [todos, setTodos] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [subtask, setSubtask] = useState([]);
    const [subtaskTitle, setSubtaskTitle] = useState(false);
    const [addSubtaskButton, setAddSubtaskButton] = useState(true);
    const tasksRef = firestore.collection("tasks");
    const [storedTasks] = useCollectionData(tasksRef);
    const [user] = useAuthState(auth);
    const [descriptionHeight, setDescriptionHeight] = useState("16px");
  
    useEffect(() => {
        setSubtask([]);
    }, [trigger]);

    useEffect(() => {
      console.log(storedTasks);
      console.log(user.uid);
    }, []);
  
    useEffect(() => {
      for (let i = 0; i < todos.length; i++) {
        console.log(todos[i]);
      }
    }, [todos]);
  
    useEffect(() => {
      const someEmpty = subtask.some((item) => item.Name === "");
      if (someEmpty) {
        setAddSubtaskButton(false);
      } else {
        setAddSubtaskButton(true);
      }
    }, [subtask]);
  
    function eventDate(day) {
      let d = new Date();
      d.setDate(d.getDate() + day);
  
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
  
    function today(day) {
      let d = new Date();
      d.setDate(d.getDate() + day);
      
      
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      const year = d.getFullYear();
      const date = d.getDate();
      const monthName = months[d.getMonth()]
  
      let formatted = `${date} ${monthName} ${year}`
      return formatted;
  
    }
  
    function weekday(day) {
      const d = new Date();
      d.setDate(d.getDate() + day);
  
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      
      const dayName = days[d.getDay()]
  
  
      const formatted = `${dayName}`
      return formatted;
  
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
  
    function handleBack() {
      setDay1(day1 - 1);
      setDay2(day2 - 1);
      setDay3(day3 - 1);
      setDay4(day4 - 1);
      setDay5(day5 - 1);
    }
  
    function handleForward() {
      setDay1(day1 + 1);
      setDay2(day2 + 1);
      setDay3(day3 + 1);
      setDay4(day4 + 1);
      setDay5(day5 + 1);
    }
  
    function handleBack2() {
      setDay1(day1 - 5);
      setDay2(day2 - 5);
      setDay3(day3 - 5);
      setDay4(day4 - 5);
      setDay5(day5 - 5);
    }
  
    function handleForward2() {
      setDay1(day1 + 5);
      setDay2(day2 + 5);
      setDay3(day3 + 5);
      setDay4(day4 + 5);
      setDay5(day5 + 5);
    }
  
    function handleAddTodo() {
      console.log(todoNameRef.current.value);
      let name = todoNameRef.current.value;
      let description = todoDescriptionRef.current.value;
      let location = todoLocationRef.current.value;
      const date = formatDate(startDate);
      const fullDate = startDate;
      const id = uuidv4();
      console.log(startDate);
      
      const userId = user.uid;
      if (name === "") {
        name = "";
      }
      if (description === "") {
        description = "";
      }
      if (location === "") {
        location = "";
      }
      if (subtask === []) {
        subtask = "";
      }
      // if (description === "") return "";
      // if (location === "") return;
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            userId: userId,
            id: id,
            name: name,
            date: date,
            description: description,
            location: location,
            subtasks: subtask,
            fullDate: fullDate
          },
        ];
      });
      todoNameRef.current.value = null;
      todoDescriptionRef.current.value = null;
      todoLocationRef.current.value = null;
  
  
      tasksRef.doc(id).set({
        userId: userId,
        id: id,
        name: name,
        date: date,
        description: description,
        location: location,
        complete: false,
        fullDate: fullDate
        // subtasks: subtask,
      });
  
      subtask.map( x => {
        const subtaskId = uuidv4();
      return (
      tasksRef.doc(id).collection('subtasks').doc(subtaskId).set({
        id: subtaskId,
        name: x.Name,
        complete: false
      })
      )
    }
  
      )
  
      setSubtask([]);
      setTrigger(false);
    }
  
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
  
    const handleAddSubtask = (e) => {
      e.preventDefault();
      const inputState = {
        subtaskId: uuidv4(),
        Name: "",
        Complete: false,
      };

      setSubtaskTitle(true);
  
      if (prevIsValid()) {
        setSubtask((prev) => [...prev, inputState]);
      }
    };
  
    const onChange = (index, e) => {
      e.preventDefault();
      e.persist();
  
      setSubtask((prev) => {
        return prev.map((item, i) => {
          if (i !== index) {
            return item;
          }
  
          return {
            ...item,
            [e.target.name]: e.target.value,
  
            
          };
        });
      });
    };
  
    const handleRemoveSubtask = (e, index) => {
      e.preventDefault();
  
      setSubtask((prev) => prev.filter((item) => item !== prev[index]));

    console.log(subtask);
      if(subtask.length === 1){
        setSubtaskTitle(false);
      }
    };
  
    function SignOut() {
      return (
        auth.currentUser && (
          <button onClick={() => auth.signOut()}>Sign Out</button>
        )
      );
    }

   

 useEffect(() => {
  var textarea = document.querySelector('textarea');

  if (trigger) {
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
}, [trigger]);


  return (
      <>
      { trigger &&
    <div className="add-task-container">
        <div className="close-btn-container"><img src="times.svg" className="close-btn" onClick={() => setTrigger(false)} /></div>
        <div className="tool-name-container"><div className="tool-name">Task</div><img className="tool-name-arrow" src="angle-right-b.svg"></img><div className="tool-name">Create task</div></div>
       
      <input className="add-task-name" ref={todoNameRef} type="text" placeholder="Add title" />
      
      <div className="date-container">
      <img className="delete-subtask-img" src="calendar-alt.svg" />
      <DatePicker
        dateFormat="eeee, d MMMM yyyy"
        locale="enGB"
        selected={startDate}
        selectsStart
        onChange={(date) => setStartDate(date)}
        className="add-task-date"
      />
      </div>
   
   <div className="description-container">
   <img className="icon-image" src="subject.svg" />
   <textarea rows='1' placeholder='Add description' ref={todoDescriptionRef} />
   </div>


      {/* {JSON.stringify(subtask)} */}
      {subtaskTitle &&
      <div className="inner">
        <div className="subtask-title-container">
        <img className="icon-image" src="clipboard-notes.svg" />
        <div className="subtask-title">Subtasks</div>
        </div>
      
      {subtask.map((item, index) => (
        <div className="subtask-container"  key={`item-${index}`}>
          <input
          className="subtask-input"
            placeholder="Add subtask name"
            type="text"
            name="Name"
            value={item.Name}
            onChange={(e) => onChange(index, e)}
          />

          <img className="delete-subtask-img" src="trash-alt.svg" onClick={(e) => handleRemoveSubtask(e, index)} />
        </div>
      ))}
      </div>
}
      
      {addSubtaskButton && (
        <div className="add-subtask-btn-container">
        <button className="add-subtask-btn" onClick={handleAddSubtask}>Add subtask</button>
        </div>
      )}
      
      <div className="location-container">
      <img className="delete-subtask-img" src="location-point.svg" />
      <input className="add-task-location" ref={todoLocationRef} type="text" placeholder="Add location" />
      </div>

      <div className="save-btn-container"><button className="save-btn" onClick={handleAddTodo}>SAVE</button></div>
      {/* <div>{SignOut()}</div> */}
    </div>
      }
      </>
  )
}
