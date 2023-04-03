import { ChangeEvent, FC, KeyboardEventHandler, useState } from 'react';
import { Space, Button, Input, Checkbox, List, Alert } from 'antd';
import { v1 } from 'uuid';
import { Task } from '../App/App';
import style from './TodoList.module.css'
import classnames from 'classnames';

interface Props {
  name: string
  tasks: Array<Task>
}

const TodoList: FC<Props> = ({ name, tasks }) => {
  const [currentTasks, setTasks] = useState<Array<Task>>(tasks)
  const [filter, setFilter] = useState<string>('all')
  const [taskName, setTaskName] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handlerDeleteTask = (id: string) => {
    const newTasks = currentTasks.filter(item => item.id !== id)
    setTasks(newTasks)
  }

  const handlerChangeTask = (evt: ChangeEvent<HTMLInputElement>) => {
    setTaskName(evt.target.value)
  }
  
  const handlerAddTask = () => {
    if (taskName.trim()) {
      const newTask: Task = {
        id: v1(),
        title: taskName,
        isDone: false,
      }
      setTasks([...currentTasks, newTask])
      setTaskName('')
    } else {
      setError('Field is required')
    }
  }

  const handlerAddTaskByEnter: KeyboardEventHandler<HTMLInputElement> = (evt) => {
    setError('')
    if (taskName.trim() && evt.key === 'Enter') {
      handlerAddTask()
    }
  }

  const taskCompleteHandler = (id: string, isDone: boolean) => {
    const currentTask = currentTasks.find(item => item.id === id)
    if (currentTask) {
      currentTask.isDone = isDone
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
    <div className={style.mainWrapper}>
      <h2 className={style.title}>{name}</h2>
      <div>
        <Space.Compact  className={style.inputWrapper} style={{ width: '100%' }}>
          <Input
            className={style.input}
            value={taskName}
            onChange={handlerChangeTask}
            onKeyDown={handlerAddTaskByEnter}
            placeholder="write task name"/>
          <Button className={style.addButton} onClick={handlerAddTask} type="primary">Add task</Button>
        </Space.Compact>
        {error &&
          <Alert
            message={error}
            type="error"
            className={style.error}
          />}
      </div>
      <List
        className={style.tasksList}
        bordered
        dataSource={filteredTasks}
        renderItem={(item) => (
          <List.Item>
            <Checkbox
              className={classnames({ [style.checkbox]: true, [style.checkboxIsDone]: item.isDone })}
              checked={item.isDone}
              onChange={() => taskCompleteHandler(item.id, !item.isDone)}
            >{item.title}</Checkbox>
            <Button
              className={style.deleteButton}
              onClick={() => handlerDeleteTask(item.id)}
              type="primary"
              shape="circle"
            >X</Button>
          </List.Item>
        )}
      />
      <Space.Compact className={style.buttonWrapper}>
        <Button className={style.button} onClick={() => setFilter('all')} type="primary">All</Button>
        <Button className={style.button} onClick={() => setFilter('active')} type="primary">Active</Button>
        <Button className={style.button} onClick={() => setFilter('completed')} type="primary">Completed</Button>
      </Space.Compact>
    </div>
  );
}
 
export default TodoList;