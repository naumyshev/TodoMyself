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

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>(
    [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]
)

    const [tasks, setTasks] = useState(
        {
            [todolistId1]: [
                { id: v1(), title: "HTML&CSS", isDone: true },
                { id: v1(), title: "JS", isDone: true },
                { id: v1(), title: "ReactJS", isDone: false },
            ],
            [todolistId2]: [
                { id: v1(), title: "rest api", isDone: false },
                { id: v1(), title: "graphQL", isDone: false }
            ]
        }
    )

    const removeTask = (taskId:string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t=>t.id !== taskId)})
    }

    const changeFilter = (value:FilterType, todolistId: string) => {
        setTodolists(todolists.map(tl=>tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = { id: v1(), title, isDone: false }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=>t.id === taskId ? {...t, isDone} : t)})
    }



    return (
        <div className="App">

            {
                todolists.map(tl => {

                    let tasksForTodolist = tasks[tl.id]

                    if (tl.filter==='Active') {
                        tasksForTodolist = tasksForTodolist.filter(el=>!el.isDone)
                    }
                    if (tl.filter==="Completed") {
                        tasksForTodolist = tasksForTodolist.filter(el=>el.isDone)
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
