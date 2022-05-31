import React from 'react'
import Task from './Task'

export default function TaskList({storedTasks, date}) {
    const check = storedTasks.filter(task => task.date === date)
    console.log(check)
  return ( 
    check.map(task2 => {
        return <Task key={task2.id} task2={task2} />
       })
  )
  
}