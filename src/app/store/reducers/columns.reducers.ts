// src/app/store/columns/column.reducer.ts
import { createReducer, on } from '@ngrx/store'
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Column } from '../../model/model'
import * as ColumnActions from '../actions/columns.actions'

export const columnAdapter = createEntityAdapter<Column>({
  selectId: column => column.name,
})

export interface ColumnState extends EntityState<Column> {
  loading: boolean
  selectedColumn?: Column | null
  error: unknown
}

export const initialState: ColumnState = columnAdapter.getInitialState({
  loading: false,
  selectedColumn: null,
  error: null,
})

export const columnReducer = createReducer(
  initialState,
  on(ColumnActions.loadColumnsSuccess, (state, { columns }) =>
    columnAdapter.setAll(columns, { ...state, error: null })
  ),
  on(ColumnActions.loadColumnsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ColumnActions.loadOneColumnSuccess, (state, { column }) =>
    columnAdapter.upsertOne(column, { ...state, error: null })
  ),
  on(ColumnActions.loadOneColumnFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ColumnActions.addColumnSuccess, (state, { column }) =>
    columnAdapter.addOne(column, { ...state, error: null })
  ),
  on(ColumnActions.addColumnFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ColumnActions.updateColumnSuccess, (state, { column }) =>
    columnAdapter.updateOne(
      { id: column.name, changes: column },
      { ...state, error: null }
    )
  ),
  on(ColumnActions.updateColumnFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ColumnActions.deleteColumnSuccess, (state, { columnName }) =>
    columnAdapter.removeOne(columnName, { ...state, error: null })
  ),
  on(ColumnActions.deleteColumnFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)
