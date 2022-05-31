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

export default function App() {
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
  const [addSubtaskButton, setAddSubtaskButton] = useState(true);
  const tasksRef = firestore.collection("tasks");
  const [storedTasks] = useCollectionData(tasksRef);
  const [user] = useAuthState(auth);

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
    const id = uuidv4();
    
    const userId = user.uid;
    if (name === "") {
      name = "Untitled Task";
    }
    if (description === "") {
      description = "Add description";
    }
    if (location === "") {
      location = "Add location";
    }
    if (subtask === []) {
      subtask = "Add subtask";
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
      complete: false
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
  };

  function SignOut() {
    return (
      auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
      )
    );
  }

  return (
    <div className="App">
      <table>
        <tbody>
         <tr>
            <td>{`${weekday(day1)}`}</td>
            <td>{`${weekday(day2)}`}</td>
            <td>{`${weekday(day3)}`}</td>
            <td>{`${weekday(day4)}`}</td>
            <td>{`${weekday(day5)}`}</td>
          </tr> 
          <tr>
            <td>{`${today(day1)}`}</td>
            <td>{`${today(day2)}`}</td>
            <td>{`${today(day3)}`}</td>
            <td>{`${today(day4)}`}</td>
            <td>{`${today(day5)}`}</td>
          </tr>
          <tr>
            <td>
              {storedTasks && (
                <TaskList storedTasks={storedTasks} date={eventDate(day1)} />
              )}
            </td>
            <td>
              {storedTasks && (
                <TaskList storedTasks={storedTasks} date={eventDate(day2)} />
              )}
            </td>
            <td>
              {storedTasks && (
                <TaskList storedTasks={storedTasks} date={eventDate(day3)} />
              )}
            </td>
            <td>
              {storedTasks && (
                <TaskList storedTasks={storedTasks} date={eventDate(day4)} />
              )}
            </td>
            <td>
              {storedTasks && (
                <TaskList storedTasks={storedTasks} date={eventDate(day5)} />
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleBack}>BACK -1</button>
      <button onClick={handleForward}>FORWARD +1</button>
      <br></br>
      <br></br>
      <button onClick={handleBack2}>BACK -5</button>
      <button onClick={handleForward2}>FORWARD +5</button>
      <br></br> <br></br>
      <input ref={todoNameRef} type="text" placeholder="Add taskname" />
      <br></br>
      <br></br>
      <DatePicker
        dateFormat="eeee, d MMMM yyyy"
        locale="enGB"
        selected={startDate}
        selectsStart
        onChange={(date) => setStartDate(date)}
        showTimeSelect
      />
      <br></br>
      <br></br>
      <textarea ref={todoDescriptionRef} placeholder="Add description" />
      <br></br>
      {JSON.stringify(subtask)}
      {subtask.map((item, index) => (
        <div key={`item-${index}`}>
          <input
            placeholder="Add subtask name"
            type="text"
            name="Name"
            value={item.Name}
            onChange={(e) => onChange(index, e)}
          />

          <button onClick={(e) => handleRemoveSubtask(e, index)}>X</button>
        </div>
      ))}
      <br></br>
      {addSubtaskButton && (
        <button onClick={handleAddSubtask}>ADD SUBTASK</button>
      )}
      <br></br>
      <br></br>
      <input ref={todoLocationRef} type="text" placeholder="Add location" />
      <br></br>
      <br></br>
      <button onClick={handleAddTodo}>SAVE</button>
      <div>{SignOut()}</div>
    </div>
  );
}
