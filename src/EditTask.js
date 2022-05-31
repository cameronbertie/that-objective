import React from 'react'
import './EditTask.css'
import Header from './Header'

export default function EditTask(props) {
  let editTaskOpen = props.editTaskOpen;

  function closeEditTask() {
    let editTaskOpen = false;
  }

  return (
    <>
    {editTaskOpen &&
    <div className="edit-task-container">
      <Header />
      <p>EDIT TASK</p>
    <button onClick={() => closeEditTask()}>X</button>
    </div>
  }
    </>
  )
}
