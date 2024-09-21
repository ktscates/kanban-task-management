import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SubtaskState, subtaskAdapter } from '../reducers/subtasks.reducers'

export const selectSubtaskState =
  createFeatureSelector<SubtaskState>('subtasks')

export const {
  selectAll: selectAllSubtasks,
  selectEntities: selectSubtaskEntities,
  selectIds: selectSubtaskIds,
  selectTotal: selectSubtaskTotal,
} = subtaskAdapter.getSelectors(selectSubtaskState)

export const selectLoading = createSelector(
  selectSubtaskState,
  (state: SubtaskState) => state.loading
)

export const selectSelectedSubtask = createSelector(
  selectSubtaskState,
  (state: SubtaskState) => state.selectedSubtask
)

export const selectError = createSelector(
  selectSubtaskState,
  (state: SubtaskState) => state.error
)
