import React, { FC } from 'react';
import './App.scss';
import TodoList from '../TodoList';

export interface Task {
  id: number
  title: string | undefined
  isDone: boolean
}

const App: FC = () =>  {
  const tasks: Array<Task> = [
    {id: 1, title: 'shit', isDone: true},
    {id: 2, title: 'dick', isDone: false},
    {id: 3, title: 'cunt', isDone: true},
    {id: 4, title: 'asshole', isDone: false},
    {id: 5, title: 'fuck', isDone: false},
  ]
  
  return (
    <div className="App">
      <TodoList name="Заголовок" tasks={tasks}/>
    </div>
  );
}

export default App;
