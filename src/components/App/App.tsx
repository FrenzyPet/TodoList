import React, { FC } from 'react';
import './App.scss';
import TodoList from '../TodoList';
import { v1 } from 'uuid';
import style from './App.module.css'

export interface Task {
  id: string
  title: string | undefined
  isDone: boolean
}

const App: FC = () =>  {
  const tasks: Array<Task> = [
    {id: v1(), title: 'shit', isDone: true},
    {id: v1(), title: 'dick', isDone: false},
    {id: v1(), title: 'cunt', isDone: true},
    {id: v1(), title: 'asshole', isDone: false},
    {id: v1(), title: 'fuck', isDone: false},
  ]
  
  return (
    <div className={style.app}>
      <TodoList name="Todo List" tasks={tasks}/>
    </div>
  );
}

export default App;
