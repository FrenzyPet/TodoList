import { FC, useRef, useState } from 'react';
import { Task } from '../App/App';

interface Props {
  name: string
  tasks: Array<Task>
}

const TodoList: FC<Props> = ({ name, tasks }) => {
  const [currentTasks, setTasks] = useState<Array<Task>>(tasks)
  const [filter, setFilter] = useState<string>('all')

  const handlerDeleteTask = (id: number) => {
    const newTasks = currentTasks.filter(item => item.id !== id)
    setTasks(newTasks)
  }
  const taskInput = useRef<HTMLInputElement | null>(null)

  const handlerAddTask = () => {
    const task: Task = {
      id: currentTasks.length + 1,
      title: taskInput?.current?.value,
      isDone: false,
    }
    setTasks([...currentTasks, task])
  }

  let filteredTasks = currentTasks
  if (filter === 'completed') {
    filteredTasks = currentTasks.filter(item => item.isDone)
  }
  if (filter === 'active') {
    filteredTasks = currentTasks.filter(item => !item.isDone)
  }

  return (
    <div>
      <h3>{name}</h3>
      <div>
        <input ref={taskInput} type="text"/>
        <button onClick={handlerAddTask}>+</button>
      </div>
      <ul>
        { filteredTasks.map(item => {
          return (
            <li key={item.id}>
              <input type="checkbox" checked={item.isDone} onChange={() => 1}/>
              <span>{item.title}</span>
              <button onClick={() => handlerDeleteTask(item.id)}>X</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button onClick={() => setFilter('all')}>all</button>
        <button onClick={() => setFilter('active')}>active</button>
        <button onClick={() => setFilter('completed')}>completed</button>
      </div>
    </div>
  );
}
 
export default TodoList;