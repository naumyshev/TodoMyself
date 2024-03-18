import {TasksStateType} from "../App";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}

type ActionType = RemoveTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {

        case "REMOVE-TASK":
        return {...state, [action.todolistId]: state[action.todolistId].filter(t=>t.id !== action.taskId)}

        default:
            return state
    }


}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type:"REMOVE-TASK", taskId, todolistId}
}