import { createAction, props } from '@ngrx/store'
import { Subtask } from '../../model/model'

// Load all subtasks
export const loadSubtasks = createAction(
  '[Subtask] Load Subtasks',
  props<{ boardName: string; columnName: string; taskName: string }>()
)

export const loadSubtasksSuccess = createAction(
  '[Subtask] Load Subtasks Success',
  props<{ subtasks: Subtask[] }>()
)

export const loadSubtasksFailure = createAction(
  '[Subtask] Load Subtasks Failure',
  props<{ error: unknown }>()
)

// Load subtask
export const loadOneSubtask = createAction(
  '[Subtask] Load One Subtask',
  props<{
    boardName: string
    columnName: string
    taskName: string
    subtaskName: string
  }>()
)

export const loadOneSubtaskSuccess = createAction(
  '[Subtask] Load One Subtask Success',
  props<{ subtask: Subtask }>()
)

export const loadOneSubtaskFailure = createAction(
  '[Subtask] Load One Subtask Failure',
  props<{ error: unknown }>()
)

// Add subtask
export const addSubtask = createAction(
  '[Subtask] Add Subtask',
  props<{
    boardName: string
    columnName: string
    taskName: string
    subtask: Subtask
  }>()
)

export const addSubtaskSuccess = createAction(
  '[Subtask] Add Subtask Success',
  props<{ subtask: Subtask }>()
)

export const addSubtaskFailure = createAction(
  '[Subtask] Add Subtask Failure',
  props<{ error: unknown }>()
)

// Update subtask
export const updateSubtask = createAction(
  '[Subtask] Update Subtask',
  props<{
    boardName: string
    columnName: string
    taskName: string
    subtask: Subtask
  }>()
)

export const updateSubtaskSuccess = createAction(
  '[Subtask] Update Subtask Success',
  props<{ subtask: Subtask }>()
)

export const updateSubtaskFailure = createAction(
  '[Subtask] Update Subtask Failure',
  props<{ error: unknown }>()
)

// Delete subtask
export const deleteSubtask = createAction(
  '[Subtask] Delete Subtask',
  props<{
    boardName: string
    columnName: string
    taskName: string
    subtaskName: string
  }>()
)

export const deleteSubtaskSuccess = createAction(
  '[Subtask] Delete Subtask Success',
  props<{ subtaskName: string }>()
)

export const deleteSubtaskFailure = createAction(
  '[Subtask] Delete Subtask Failure',
  props<{ error: unknown }>()
)
