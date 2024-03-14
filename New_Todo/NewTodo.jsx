import React, { useState } from 'react';
import './NewTodo.css';
// ✏️ 🗑️

function NewTodo() {
  const TODO = 'TODO';//obj ke status ko maintain krne ke liye varible banaya
  const DOING = 'DOING';
  const DONE = 'DONE';

  const [value, setValue] = useState('');//input mai value dene ke liye
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);//kisi div ko dregg krne pr yeh usestate use hoga
  const [updateItem, setUpdateItem] = useState(null);//task edit krne ke liye

  const handleChange = (e) => {//text box mai value dene pr insert krega
    setValue(e.target.value);//setvalue mai value milega
  }

  const handleKeyDown = (e) => {
    // console.log(e.keyCode);// is se console mai hame pta chalega konse key mai konsa code hota hai
    if (e.keyCode === 13) {//Enter pressed enter ka key code 13 hai
      if (updateItem) {//user is coming for an update
        const obj = {// value ko upadate ,edit krne ke liye object bnaya
          title: value,
          id: updateItem.id,//update item ki id lege
          status: updateItem.status//update item ka status lenge
        }
        const copyTask = [...tasks];
        const filterList =
          copyTask.filter((item) => item.id !== updateItem.id);//purane wale task ko delete kr ke nye update krnge
        setTasks((prevTask) => [...filterList, obj]);
        setUpdateItem(null);
      } else {
        const obj = {
          title: value,
          status: TODO,
          id: Date.now()//hm id date ke anushar le rhe hai
        }
        setTasks((prevTasks) => [...prevTasks, obj]);//preves task ko copy krke new task ko disply krega
      }
      setValue('')//after press enter input box empty
  }
}
  // console.log(task)
  // console.log(value)

  const handleDrag = (e, task) => {
    setDragTask(task);
  }
  // console.log(dragTask)

  const handleDragNDrop  = (status) => {
    let copyTask = [...tasks];
    copyTask = copyTask.map((item) => {
      if (dragTask.id === item.id) {//task ko drrag krne ke baad uska status change ho jaayega
        item.status = status
      }
      return item;
    });
    setTasks(copyTask);//setTask mai copytask aa jayega jo hamne drrage kiya hai
    setDragTask(null);//jis task ko drrage kr rhe hai usse hta rha hai
  }
  const handleOnDrop = (e) => {
    const status = e.target.getAttribute('data-status');//TODO,DOING,DONE this is data attribute
    // console.log('dropping ', status);//isse chek kre kaise dragge hone pr status change ho rha hai
    if (status === TODO) {//drrop krne pr status change hoga aur handleDragNDrop fun run hoga
      handleDragNDrop(TODO);
    } else if (status === DOING) {
      handleDragNDrop(DOING);
    } else if (status === DONE) {
      handleDragNDrop(DONE);
    }
  }
  const onDragOver = (e) => {//drag complete ho jaye jab run hoga
    e.preventDefault();
  }

  const deleteTask = (item) => {//delete btn pr click kr ke jis id pr click kiya hai usse filter kr kr hataya!==item.id
    let copyTask = [...tasks];
    copyTask = copyTask.filter((task) => task.id !== item.id);
    setTasks(copyTask);
  }

  const updateTask = (task) => {
    setUpdateItem(task);
    setValue(task.title);//input box mai title aa jayega
  }
  // console.log('updateItem ', updateItem);
  const todoTasks = tasks.filter(task => task.status === TODO);
  const doingTasks = tasks.filter(task => task.status === DOING);
  const doneTasks = tasks.filter(task => task.status === DONE);
  const totalTasks = todoTasks.length+doingTasks.length+doneTasks.length;
  
 return (
    <div className="App">
      <h1>Task Manager</h1> 
      <div>
      <p className='totaltasks'>
        Total Task :{totalTasks}
      </p>
      </div>
      <input
        onChange={handleChange}
        type='text'
        value={value}
        onKeyDown={handleKeyDown}
      />

      <div className='board'> 
      
        <div  className='todo'
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
          data-status={TODO}
        >
        <p className='todolenght'>Todo tasks: {todoTasks.length}</p>

          <h2 className='todo-col'>Todo</h2>
          {
            tasks.length > 0 && tasks.map((task) => (//task ki length 0 se jyada hogi toh run hoga map
              task.status === TODO && <div//// task ka status todo hoga toh yeh div run hoga
                onDrag={(e) => handleDrag(e, task)}//iss div ko drag krne pr yeh fun run hoga
                draggable // div ko draggble bnane ke li yeh key word use kiya
                key={task.id}
                className='task-item'>
                {task.title}
                <div>
                  <span className='btn'
                    onClick={() => updateTask(task)}//edit btn pr click kr ke yeh fun call hoga
                  >✏️</span>
                  <span
                    onClick={(e) => deleteTask(task)}//delete task ko call kr rha hai icone pr click krne pr
                    className='btn'>🗑️</span>
                    {/* <span>Hello</span> */}
                </div>
              </div>
            ))
          }
        </div>

        <div className='doing'//doing div
          data-status={DOING}
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
        >
        <p className='doinglength'>Doing tasks: {doingTasks.length}</p>
          
          <h2 className='doing-col'>Doing</h2>
          {
            tasks.length > 0 && tasks.map((task) => (
              task.status === DOING && <div
                onDrag={(e) => handleDrag(e, task)}
                draggable
                key={task.id}
                className='task-item'>
                {task.title}
                <div>
                  <span className='btn'
                    onClick={() => updateTask(task)}
                  >✏️</span>
                  <span className='btn'
                    onClick={(e) => deleteTask(task)}
                  >🗑️</span>
                </div>
              </div>
            ))
          }
        </div>

        <div className='done'//done div
          data-status={DONE}
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
        >
        <p className='donelength'>Done tasks: {doneTasks.length}</p>

          <h2 className='done-col'>Done</h2>
          {
            tasks.length > 0 && tasks.map((task) => (
              task.status === DONE && <div
                onDrag={(e) => handleDrag(e, task)}
                draggable
                key={task.id}
                className='task-item'>
                {task.title}
                <div>
                  <span className='btn'
                    onClick={() => updateTask(task)}
                  >✏️</span>
                  <span className='btn'
                    onClick={(e) => deleteTask(task)}
                  >🗑️</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );

}


export default NewTodo;


