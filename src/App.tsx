import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const tasks = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "rest api", isDone: false },
        { id: 5, title: "graphQL", isDone: false }
    ]

    const title = "What to learn"

    return (
        <div className="App">
            <Todolist title={title} tasks={tasks}/>


        </div>
    );
}

export default App;
