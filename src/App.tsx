import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = "All" | "Completed" | "Active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}


function App() {

    const [todolists, setTodolists] = useState<TodolistType[]>(
    [
        {id: v1(), title: 'What to learn', filter: 'All'},
        {id: v1(), title: 'What to buy', filter: 'All'}
    ]
)

    const [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "rest api", isDone: false },
        { id: v1(), title: "graphQL", isDone: false }
    ])

    const removeTask = (id:string) => {
        setTasks(tasks.filter(t=>t.id !== id))
    }

    const changeFilter = (value:FilterType, todolistId: string) => {
        setTodolists(todolists.map(tl=>tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    const addTask = (title: string) => {
        setTasks([{ id: v1(), title, isDone: false }, ...tasks])
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone} : t))
    }



    return (
        <div className="App">

            {
                todolists.map(tl => {

                    let tasksForTodolist = tasks

                    if (tl.filter==='Active') {
                        tasksForTodolist = tasks.filter(el=>!el.isDone)
                    }
                    if (tl.filter==="Completed") {
                        tasksForTodolist = tasks.filter(el=>el.isDone)
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;
