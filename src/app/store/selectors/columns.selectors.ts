import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ColumnState, columnAdapter } from '../reducers/columns.reducers'

export const selectColumnState = createFeatureSelector<ColumnState>('columns')

export const {
  selectAll: selectAllColumns,
  selectEntities: selectColumnEntities,
  selectIds: selectColumnIds,
  selectTotal: selectColumnTotal,
} = columnAdapter.getSelectors(selectColumnState)

export const selectLoading = createSelector(
  selectColumnState,
  (state: ColumnState) => state.loading
)

export const selectSelectedColumn = createSelector(
  selectColumnState,
  (state: ColumnState) => state.selectedColumn
)

export const selectError = createSelector(
  selectColumnState,
  (state: ColumnState) => state.error
)
