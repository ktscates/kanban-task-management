import { BoardState } from '../store/reducers/boards.reducers'
import { ColumnState } from '../store/reducers/columns.reducers'
import { SubtaskState } from '../store/reducers/subtasks.reducers'
import { TaskState } from '../store/reducers/tasks.reducers'

export interface Subtask {
  title: string
  isCompleted: boolean
}

export interface Task {
  title: string
  description: string
  status: string
  subtasks: Subtask[]
}

export interface Column {
  name: string
  tasks: Task[]
}

export interface Board {
  name: string
  columns: Column[]
}

export interface AppState {
  boards: BoardState
  columns: ColumnState
  tasks: TaskState
  subtasks: SubtaskState
}
