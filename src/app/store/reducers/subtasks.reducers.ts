import { createReducer, on } from '@ngrx/store'
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Subtask } from '../../model/model'
import * as SubtaskActions from '../actions/subtasks.actions'

export const subtaskAdapter = createEntityAdapter<Subtask>({
  selectId: subtask => subtask.title, // Using `name` as the unique identifier for subtasks
})

export interface SubtaskState extends EntityState<Subtask> {
  loading: boolean
  selectedSubtask?: Subtask | null
  error: unknown
}

export const initialState: SubtaskState = subtaskAdapter.getInitialState({
  loading: false,
  selectedSubtask: null,
  error: null,
})

export const subtaskReducer = createReducer(
  initialState,
  on(SubtaskActions.loadSubtasksSuccess, (state, { subtasks }) =>
    subtaskAdapter.setAll(subtasks, { ...state, error: null })
  ),
  on(SubtaskActions.loadSubtasksFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SubtaskActions.loadOneSubtaskSuccess, (state, { subtask }) =>
    subtaskAdapter.upsertOne(subtask, { ...state, error: null })
  ),
  on(SubtaskActions.loadOneSubtaskFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SubtaskActions.addSubtaskSuccess, (state, { subtask }) =>
    subtaskAdapter.addOne(subtask, { ...state, error: null })
  ),
  on(SubtaskActions.addSubtaskFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SubtaskActions.updateSubtaskSuccess, (state, { subtask }) =>
    subtaskAdapter.updateOne(
      { id: subtask.title, changes: subtask },
      { ...state, error: null }
    )
  ),
  on(SubtaskActions.updateSubtaskFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SubtaskActions.deleteSubtaskSuccess, (state, { subtaskName }) =>
    subtaskAdapter.removeOne(subtaskName, { ...state, error: null })
  ),
  on(SubtaskActions.deleteSubtaskFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)
