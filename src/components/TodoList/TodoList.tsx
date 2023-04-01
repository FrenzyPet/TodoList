import { ChangeEvent, FC, KeyboardEventHandler, useState } from 'react';
import { Task } from '../App/App';
import { v1 } from 'uuid';

interface Props {
  name: string
  tasks: Array<Task>
}

const TodoList: FC<Props> = ({ name, tasks }) => {
  const [currentTasks, setTasks] = useState<Array<Task>>(tasks)
  const [filter, setFilter] = useState<string>('all')
  const [taskName, setTaskName] = useState<string>('')

  const handlerDeleteTask = (id: string) => {
    const newTasks = currentTasks.filter(item => item.id !== id)
    setTasks(newTasks)
  }

  const handlerChangeTask = (evt: ChangeEvent<HTMLInputElement>) => {
    setTaskName(evt.target.value)
  }
  
  const handlerAddTask = () => {
    if (taskName) {
      const newTask: Task = {
        id: v1(),
        title: taskName,
        isDone: false,
      }
      setTasks([...currentTasks, newTask])
      setTaskName('')
    }
  }

  const handlerAddTaskByEnter: KeyboardEventHandler<HTMLInputElement> = (evt) => {
    if (taskName && evt.key === 'Enter') {
      handlerAddTask()
    }
  }


  const taskCompleteHandler = (id: string) => {
    const currentTask = currentTasks.find(item => item.id === id)
    if (currentTask) {
      currentTask.isDone = !currentTask.isDone
      setTasks([...currentTasks])
    }
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
        <input type="text"
          value={taskName}
          onChange={handlerChangeTask}
          onKeyDown={handlerAddTaskByEnter}
        />
        <button onClick={handlerAddTask}>+</button>
      </div>
      <ul>
        { filteredTasks.map(item => {
          return (
            <li key={item.id}>
              <input type="checkbox" checked={item.isDone} onChange={() => taskCompleteHandler(item.id)}/>
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