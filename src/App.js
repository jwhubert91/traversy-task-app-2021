import React, { useState, useEffect} from 'react'
import { v4 as uuid } from 'uuid'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import AddTask from './components/AddTask'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks'

function App() {
  const [showAddTask,setShowAddTask] = useState(false);
  const [tasks,setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromDB = await fetchTasks();
      setTasks(tasksFromDB)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const dbRaw = require('./db.json');
    const db = await dbRaw.tasks;
    return db;
  }

  // Fetch Task
  // const fetchTask = async (id) => {
  //   const res = await fetch(`http://localhost:5000/tasks/${id}`)
  //   const data = await res.json()

  //   return data;
  // }

  // Add Task
  const addTask = (task) => {
    // const res = await fetch('http://localhost:5000/tasks', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify(task)
    // })

    // const data = await res.json()
    const newTask = {
      ...task,
      id: uuid()
    }
    setTasks([...tasks,newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    // await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: 'DELETE',
    // })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => 
      task.id === id ? {...task, reminder: !task.reminder } : task
    ))
  }

  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Route path='/' exact render={(props) => (
          <React.Fragment>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            ) : (
              "No Tasks To Show"
            )}
          </React.Fragment>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
