import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterType = "All" | "Completed" | "Active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithUseReducer() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer,
    [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]
)
    const [tasks, dispatchToTasks] = useReducer(tasksReducer,
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
        const action = removeTaskAC(taskId, todolistId)
        dispatchToTasks(action)
    }

    const changeFilter = (value:FilterType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToTodolists(action)
    }

    const removeTodolist = (id: string) => {
        const action = removeTodolistAC(id)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatchToTasks(action)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId,isDone, todolistId)
        dispatchToTasks(action)
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatchToTasks(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatchToTodolists(action)
    }

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6'>
                        Todolist
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <div>
                        <h3>Add new todolist</h3>
                        <AddItemForm addItem={addTodolist} />
                    </div>
                </Grid>
                <Grid container spacing={5}>
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
                                <Grid item>
                                    <Paper style={{padding: '20px', marginTop: '20px'}}>
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
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>

            </Container>


        </div>
    );
}

export default AppWithUseReducer;
