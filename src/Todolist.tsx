import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState('')

    const changeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={newTitle}
                onChange={onChangeHandler}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        props.addTask(newTitle)
                        setNewTitle('')
                    }
                }}
            />
            <button onClick={() => {
                props.addTask(newTitle)
                setNewTitle('')
            }}>+
            </button>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                        // const removeTaskHandler = () => {
                        //     props.removeTask(t.id)
                        // }

                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => {
                                    removeTaskHandler(t.id)
                                }}>x
                                </button>
                            </li>)
                    }
                )
            }


        </ul>
        <div>
            <button onClick={() => changeFilterHandler('all')}>All</button>
            <button onClick={() => changeFilterHandler('active')}>Active</button>
            <button onClick={() => changeFilterHandler('completed')}>Completed</button>
        </div>
    </div>
}
