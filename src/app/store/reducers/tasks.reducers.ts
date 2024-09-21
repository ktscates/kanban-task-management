import { createReducer, on } from '@ngrx/store'
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Task } from '../../model/model'
import * as TaskActions from '../actions/tasks.actions'

export const taskAdapter = createEntityAdapter<Task>({
  selectId: task => task.title, // Using `name` as the unique identifier for tasks
})

export interface TaskState extends EntityState<Task> {
  loading: boolean
  selectedTask?: Task | null
  error: unknown
}

export const initialState: TaskState = taskAdapter.getInitialState({
  loading: false,
  selectedTask: null,
  error: null,
})

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) =>
    taskAdapter.setAll(tasks, { ...state, error: null })
  ),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TaskActions.loadOneTaskSuccess, (state, { task }) =>
    taskAdapter.upsertOne(task, { ...state, error: null })
  ),
  on(TaskActions.loadOneTaskFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TaskActions.addTaskSuccess, (state, { task }) =>
    taskAdapter.addOne(task, { ...state, error: null })
  ),
  on(TaskActions.addTaskFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TaskActions.updateTaskSuccess, (state, { task }) =>
    taskAdapter.updateOne(
      { id: task.title, changes: task },
      { ...state, error: null }
    )
  ),
  on(TaskActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TaskActions.deleteTaskSuccess, (state, { taskName }) =>
    taskAdapter.removeOne(taskName, { ...state, error: null })
  ),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)
