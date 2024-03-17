import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolistId = v1()
            const newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter: 'All'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return (state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl))
        case 'CHANGE-TODOLIST-FILTER':
            return (state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl))
        default:
            return state
    }
}