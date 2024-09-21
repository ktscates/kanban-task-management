import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TaskState, taskAdapter } from '../reducers/tasks.reducers'

export const selectTaskState = createFeatureSelector<TaskState>('tasks')

export const {
  selectAll: selectAllTasks,
  selectEntities: selectTaskEntities,
  selectIds: selectTaskIds,
  selectTotal: selectTaskTotal,
} = taskAdapter.getSelectors(selectTaskState)

export const selectLoading = createSelector(
  selectTaskState,
  (state: TaskState) => state.loading
)

export const selectSelectedTask = createSelector(
  selectTaskState,
  (state: TaskState) => state.selectedTask
)

export const selectError = createSelector(
  selectTaskState,
  (state: TaskState) => state.error
)
