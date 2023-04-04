import { v1 } from 'uuid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export enum Filters {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface Task {
  id: string
  title: string
  isDone: boolean
}

interface State {
  tasks: Array<Task>,
  filter: Filters
}

interface Actions {
  addTodo: (newTaskTitle: string) => void
  removeTodo: (taskID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean) => void
  changeFilter: (filter: Filters) => void
}

export const useTodos = create<State & Actions>()(devtools(immer((set) => ({
  tasks: [
    { id: v1(), title: 'Learn HTML', isDone: true },
    { id: v1(), title: 'Learn CSS', isDone: true },
    { id: v1(), title: 'Learn JS', isDone: true },
    { id: v1(), title: 'Learn React', isDone: true },
    { id: v1(), title: 'Learn Redux Toolkit', isDone: true },
    { id: v1(), title: 'Learn Typescript', isDone: false },
    { id: v1(), title: 'Learn Zustand', isDone: false },
  ],
  filter: Filters.All,
  addTodo: (newTaskTitle) => set(state => {
    const newTask =  { id: v1(), title: newTaskTitle, isDone: false }
    state.tasks.push(newTask)
  }),
  removeTodo: (taskID) => set(state => {
    state.tasks = state.tasks.filter(item => item.id !== taskID)
  }),
  changeTaskStatus: (taskID, isDone) => set(state => {
    const changedTask = state.tasks.find(item => item.id === taskID)
    if (changedTask) {
      changedTask.isDone = isDone
    }
  }),
  changeFilter: (filter) => set(state => {
    state.filter = filter
  }),
}))))