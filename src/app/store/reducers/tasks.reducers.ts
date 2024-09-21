import { createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Task } from '../../model/model'
import * as TaskActions from '../actions/tasks.actions'

// Define state for tasks
export interface TaskState extends EntityState<Task> {
  loading: boolean
  selectedTask?: Task | null
  error: unknown
}

// Create adapter for entity
export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.title, // Assuming task name is unique
})

export const initialState: TaskState = adapter.getInitialState({
  loading: false,
  selectedTask: null,
  error: null,
})

// Reducer
export const taskReducer = createReducer(
  initialState,
  // Load tasks
  on(TaskActions.loadTasks, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) =>
    adapter.setAll(tasks, {
      ...state,
      loading: false,
    })
  ),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load single task
  on(TaskActions.loadTask, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TaskActions.loadTaskSuccess, (state, { task }) => ({
    ...state,
    loading: false,
    selectedTask: task,
  })),
  on(TaskActions.loadTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add task
  on(TaskActions.addTaskSuccess, (state, { task }) =>
    adapter.addOne(task, state)
  ),
  on(TaskActions.addTaskFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Update task
  on(TaskActions.updateTaskSuccess, (state, { task }) =>
    adapter.updateOne({ id: task.title, changes: task }, state)
  ),
  on(TaskActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Delete task
  on(TaskActions.deleteTaskSuccess, (state, { taskName }) =>
    adapter.removeOne(taskName, state)
  ),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)
