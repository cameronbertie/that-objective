import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";

export default function App() {

  const [daysToView, setDaysToView] = useState([])
  const todoNameRef = useRef();
  const [todos, setTodos] = useState([]);
  const [startDate, setStartDate] = useState(new Date(new Date().setHours(0,0,0,0)));

  const setupDaysArray = (n) => {
    let tempDaysArray = []
    for(let i=0; i < n; i++){
        console.log(startDate)
      let d = new Date(startDate.getTime()+i*(60 * 60 * 24 * 1000))
      tempDaysArray.push(d)
    }
    return tempDaysArray
  }


  useEffect(()=> {
    setDaysToView(setupDaysArray(5))
    
  }, [])

  useEffect(() => {
    if(daysToView != null){
        setTodos([
            {name: "Test", date: new Date()}
        ])
    }
    
  }, [daysToView])

  const shiftDays = (daysArray, offset) =>{
      setDaysToView(daysArray.map((item) => {
          item.setTime(item.getTime()+offset*(60*60*24*1000))
          return item
      }))
  }

  const handleAddTodo = () => {
    const name = todoNameRef.current.value
    //Create task
    setTodos([...todos, {name: name, date: startDate}])
    console.log()
  }

  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            {daysToView.map((item)=> {
                return (<td>{item.toLocaleDateString()}</td>)
            })}
          </tr>
          <tr>
          {daysToView.map((item) => {
              return(<td><TaskList date={item} tasks={todos}/></td>)
          })}
          </tr>
          
        </tbody>
      </table>
      <button onClick={() => {shiftDays(daysToView, -1)}}>BACK -1</button>
      <button onClick={() => {shiftDays(daysToView, 1)}}>FORWARD +1</button>
      <br></br>
      <br></br>
      <button onClick={() => {shiftDays(daysToView, -5)}}>BACK -5</button>
      <button onClick={() => {shiftDays(daysToView, 5)}}>FORWARD +5</button>
      <br></br> <br></br>
      <input ref={todoNameRef} type="text"/>
      <DatePicker  selected={startDate} onChange={(date) => setStartDate(date)} />
      <button onClick={handleAddTodo}>ADD</button>
      <button onClick={() => {}}>ADD</button>

      {startDate.toDateString()}
    </div>
  );
}
const TaskList = (props) => {

    // CHeck if tasks for that dat
    let tasksForDay = props.tasks.filter((task) => {
       if(task.date.setHours(0,0,0,0) === props.date.setHours(0,0,0,0)){
           return true
       }
    }) 

    return(<div>
        {tasksForDay.map((task) => {
            return(<div>{task.name}</div>)
        })}
    </div>)
}