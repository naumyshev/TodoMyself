import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
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

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter') {
            addTask()
        }
    }

    const onChangeFilterHandler = (value: FilterType) => {
        props.changeFilter(value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {

                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => {
                                props.removeTask(el.id)
                            }}>✖
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {onChangeFilterHandler("All")}}>All</button>
                <button onClick={() => {onChangeFilterHandler("Active")}}>Active</button>
                <button onClick={() => {onChangeFilterHandler("Completed")}}>Completed</button>
            </div>
        </div>
    );
};

