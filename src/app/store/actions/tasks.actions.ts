import { createAction, props } from '@ngrx/store'
import { Task } from '../../model/model'

// Load tasks
export const loadTasks = createAction(
  '[Task] Load Tasks',
  props<{ boardName: string; columnName: string }>()
)

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
)

export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: unknown }>()
)

// Load one task
export const loadTask = createAction(
  '[Task] Load Task',
  props<{ boardName: string; columnName: string; taskName: string }>()
)

export const loadTaskSuccess = createAction(
  '[Task] Load Task Success',
  props<{ task: Task }>()
)

export const loadTaskFailure = createAction(
  '[Task] Load Task Failure',
  props<{ error: unknown }>()
)

// Add task
export const addTask = createAction(
  '[Task] Add Task',
  props<{ boardName: string; columnName: string; task: Task }>()
)

export const addTaskSuccess = createAction(
  '[Task] Add Task Success',
  props<{ task: Task }>()
)

export const addTaskFailure = createAction(
  '[Task] Add Task Failure',
  props<{ error: unknown }>()
)

// Update task
export const updateTask = createAction(
  '[Task] Update Task',
  props<{
    boardName: string
    columnName: string
    taskName: string
    task: Task
  }>()
)

export const updateTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ task: Task }>()
)

export const updateTaskFailure = createAction(
  '[Task] Update Task Failure',
  props<{ error: unknown }>()
)

// Delete task
export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ boardName: string; columnName: string; taskName: string }>()
)

export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ taskName: string }>()
)

export const deleteTaskFailure = createAction(
  '[Task] Delete Task Failure',
  props<{ error: unknown }>()
)
