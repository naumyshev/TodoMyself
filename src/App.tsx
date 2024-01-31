import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = "All" | "Completed" | "Active"


function App() {

    const [filter, setFilter] = useState<FilterType>('All')
    const [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "rest api", isDone: false },
        { id: v1(), title: "graphQL", isDone: false }
    ])

    const title = "What to learn"

    const removeTask = (id:string) => {
        setTasks(tasks.filter(t=>t.id !== id))
    }

    const changeFilter = (value:FilterType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        setTasks([{ id: v1(), title, isDone: false }, ...tasks])
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone} : t))
    }

    let tasksForTodolist = tasks

    if (filter==='Active') {
        tasksForTodolist = tasks.filter(el=>!el.isDone)
    }
    if (filter==="Completed") {
        tasksForTodolist = tasks.filter(el=>el.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
