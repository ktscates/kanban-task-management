import { createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Subtask } from '../../model/model'
import * as SubtaskActions from '../actions/subtasks.actions'

// Define state for subtasks
export interface SubtaskState extends EntityState<Subtask> {
  loading: boolean
  selectedSubtask?: Subtask | null
  error: unknown
}

// Create adapter for entity
export const adapter: EntityAdapter<Subtask> = createEntityAdapter<Subtask>({
  selectId: (subtask: Subtask) => subtask.title, // Assuming subtask name is unique
})

export const initialState: SubtaskState = adapter.getInitialState({
  loading: false,
  selectedSubtask: null,
  error: null,
})

// Reducer
export const subtaskReducer = createReducer(
  initialState,
  // Load subtasks
  on(SubtaskActions.loadSubtasks, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubtaskActions.loadSubtasksSuccess, (state, { subtasks }) =>
    adapter.setAll(subtasks, {
      ...state,
      loading: false,
    })
  ),
  on(SubtaskActions.loadSubtasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load single subtask
  on(SubtaskActions.loadSubtask, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubtaskActions.loadSubtaskSuccess, (state, { subtask }) => ({
    ...state,
    loading: false,
    selectedSubtask: subtask,
  })),
  on(SubtaskActions.loadSubtaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add subtask
  on(SubtaskActions.addSubtaskSuccess, (state, { subtask }) =>
    adapter.addOne(subtask, state)
  ),
  on(SubtaskActions.addSubtaskFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Update subtask
  on(SubtaskActions.updateSubtaskSuccess, (state, { subtask }) =>
    adapter.updateOne({ id: subtask.title, changes: subtask }, state)
  ),
  on(SubtaskActions.updateSubtaskFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Delete subtask
  on(SubtaskActions.deleteSubtaskSuccess, (state, { subtaskName }) =>
    adapter.removeOne(subtaskName, state)
  ),
  on(SubtaskActions.deleteSubtaskFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)
