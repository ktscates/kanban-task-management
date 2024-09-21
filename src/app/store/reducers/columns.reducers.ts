import { createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Column } from '../../model/model'
import * as ColumnActions from '../actions/columns.actions'

// Define state for columns
export interface ColumnState extends EntityState<Column> {
  loading: boolean
  selectedColumn?: Column | null
  error: unknown
}

// Create adapter for entity
export const adapter: EntityAdapter<Column> = createEntityAdapter<Column>({
  selectId: (column: Column) => column.name, // Assuming column name is unique
})

export const initialState: ColumnState = adapter.getInitialState({
  loading: false,
  selectedColumn: null,
  error: null,
})

// Reducer
export const columnReducer = createReducer(
  initialState,
  // Load columns
  on(ColumnActions.loadColumns, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ColumnActions.loadColumnsSuccess, (state, { columns }) =>
    adapter.setAll(columns, {
      ...state,
      loading: false,
    })
  ),
  on(ColumnActions.loadColumnsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load single column
  on(ColumnActions.loadColumn, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ColumnActions.loadColumnSuccess, (state, { column }) => ({
    ...state,
    loading: false,
    selectedColumn: column,
  })),
  on(ColumnActions.loadColumnFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add column
  on(ColumnActions.addColumnSuccess, (state, { column }) =>
    adapter.addOne(column, state)
  ),
  on(ColumnActions.addColumnFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Update column
  on(ColumnActions.updateColumnSuccess, (state, { column }) =>
    adapter.updateOne({ id: column.name, changes: column }, state)
  ),
  on(ColumnActions.updateColumnFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Delete column
  on(ColumnActions.deleteColumnSuccess, (state, { columnName }) =>
    adapter.removeOne(columnName, state)
  ),
  on(ColumnActions.deleteColumnFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)
