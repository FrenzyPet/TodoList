import { ChangeEvent, FC, KeyboardEventHandler, useState } from 'react';
import { Space, Button, Input, Checkbox, List, Alert } from 'antd';
import style from './TodoList.module.scss'
import classnames from 'classnames';
import { Filter, useTodos } from '../../store/store'

interface Props {
  name: string
}

const TodoList: FC<Props> = ({ name }) => {
  const tasks = useTodos(state => state.tasks)
  const filter = useTodos(state => state.filter)
  const addTodo = useTodos(state => state.addTodo)
  const removeTodo = useTodos(state => state.removeTodo)
  const changeTaskStatus = useTodos(state => state.changeTaskStatus)
  const changeFilter = useTodos(state => state.changeFilter)
  const [taskName, setTaskName] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handlerDeleteTask = (id: string) => {
    removeTodo(id)
  }

  const handlerChangeTask = (evt: ChangeEvent<HTMLInputElement>) => {
    setTaskName(evt.target.value)
  }
  
  const handlerAddTask = () => {
    if (taskName.trim()) {
      addTodo(taskName)
      setTaskName('')
    } else {
      setTaskName('')
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
    changeTaskStatus(id, isDone)
  }

  let filteredTasks = tasks
  if (filter === 'completed') {
    filteredTasks = tasks.filter(item => item.isDone)
  }
  if (filter === 'active') {
    filteredTasks = tasks.filter(item => !item.isDone)
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
        <Button
          className={classnames({ [style.button]: true, [style.buttonActive]: filter === Filter.All })}
          onClick={() => changeFilter(Filter.All)}
          type="primary"
        >All</Button>
        <Button
          className={classnames({ [style.button]: true, [style.buttonActive]: filter === Filter.Active })}
          onClick={() => changeFilter(Filter.Active)}
          type="primary"
        >Active</Button>
        <Button
          className={classnames({ [style.button]: true, [style.buttonActive]: filter === Filter.Completed })}
          onClick={() => changeFilter(Filter.Completed)}
          type="primary"
        >Completed</Button>
      </Space.Compact>
    </div>
  );
}
 
export default TodoList;