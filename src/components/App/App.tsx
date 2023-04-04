import React, { FC } from 'react';
import TodoList from '../TodoList';
import style from './App.module.scss'

const App: FC = () =>  {
  
  return (
    <div className={style.app}>
      <TodoList name="Todo List"/>
    </div>
  );
}

export default App;
