import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { v1 } from 'uuid';
import { create } from 'zustand';

interface Task {
  id: string
  title: string
  isDone: boolean
}

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface State {
  tasks: Array<Task>,
  filter: Filter
}

interface Actions {
  addTodo: (newTaskTitle: string) => void
  removeTodo: (taskID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean) => void
  changeFilter: (filter: Filter) => void
}

export const useTodos = create<State & Actions>()(devtools(immer((set) => ({
  tasks: [
    {id: v1(), title: 'shit', isDone: true},
    {id: v1(), title: 'dick', isDone: false},
    {id: v1(), title: 'cunt', isDone: true},
    {id: v1(), title: 'asshole', isDone: false},
    {id: v1(), title: 'fuck', isDone: false},
  ],
  filter: Filter.All,
  addTodo: (newTaskTitle) => set(state => {
    const newTask =  {id: v1(), title: newTaskTitle, isDone: false}
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