import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterType = "All" | "Completed" | "Active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
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

    const [tasks, setTasks] = useState<TasksStateType>(
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

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(td => td.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = { id: v1(), title, isDone: false }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=>t.id === taskId ? {...t, isDone} : t)})
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=>t.id===taskId ? {...t, title: newTitle} : t)})
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title, filter: 'All'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        setTodolists(todolists.map(tl=>tl.id===todolistId ? {...tl, title: newTitle} : tl))
    }

    return (
        <div className="App">
            <div>
                <h3>Add new todolist</h3>
                <AddItemForm addItem={addTodolist} />
            </div>

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
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;
