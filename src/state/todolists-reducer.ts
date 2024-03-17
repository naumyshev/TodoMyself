import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterType
}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

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