import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterType = "All" | "Completed" | "Active"


function App() {

    const [filter, setFilter] = useState<FilterType>('All')

    const [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "rest api", isDone: false },
        { id: 5, title: "graphQL", isDone: false }
    ])

    const title = "What to learn"

    const removeTask = (id:number) => {
        setTasks(tasks.filter(t=>t.id !== id))
        console.log(tasks)
    }

    const changeFilter = (value:FilterType) => {
        setFilter(value)
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
            />


        </div>
    );
}

export default App;
