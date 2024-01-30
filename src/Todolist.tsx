import React, {useState} from 'react';
import {FilterType} from "./App";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:string) => void
    changeFilter: (value:FilterType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={(e) => {setTitle(e.currentTarget.value)}}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {

                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={()=>{props.removeTask(el.id)}}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter("All")}}>All</button>
                <button onClick={()=>{props.changeFilter("Active")}}>Active</button>
                <button onClick={()=>{props.changeFilter("Completed")}}>Completed</button>
            </div>
        </div>
    );
};

