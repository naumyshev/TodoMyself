import React from 'react';
import {FilterType} from "./App";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:number) => void
    changeFilter: (value:FilterType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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

