import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    removeTodolist: (id: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onChangeFilterHandler = (value: FilterType) => {
        props.changeFilter(value, props.id)
    }

    const onClickRemoveTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const onChangeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }



    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={onChangeTodolistTitleHandler} />
                <button onClick={onClickRemoveTodolistHandler}>✖</button>
            </h3>

            <div>
                <AddItemForm addItem={addTask} />
            </div>
            <ul>
                {props.tasks.map(el => {

                    const onClickHandler = () => props.removeTask(el.id, props.id)

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
                    }

                    const changeTaskTitleHandler = (newTitle:string) => {
                        props.changeTaskTitle(el.id, newTitle, props.id)
                    }

                    return (
                        <li className={el.isDone ? 'is-done' : ''} key={el.id}>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={onChangeStatusHandler}
                            />
                            <EditableSpan value={el.title} onChange={changeTaskTitleHandler} />
                            <button onClick={onClickHandler}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={props.filter === "All" ? 'active-filter' : ''}
                    onClick={()=>{onChangeFilterHandler("All")}}>
                    All
                </button>
                <button
                    className={props.filter === "Active" ? 'active-filter' : ''}
                    onClick={() => {onChangeFilterHandler("Active")}}>
                    Active
                </button>
                <button
                    className={props.filter === "Completed" ? 'active-filter' : ''}
                    onClick={() => {onChangeFilterHandler("Completed")}}>
                    Completed
                </button>
            </div>
        </div>
    );
};

