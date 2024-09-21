import { createAction, props } from '@ngrx/store'
import { Column } from '../../model/model'

// Load columns
export const loadColumns = createAction(
  '[Column] Load Columns',
  props<{ boardName: string }>()
)

export const loadColumnsSuccess = createAction(
  '[Column] Load Columns Success',
  props<{ columns: Column[] }>()
)

export const loadColumnsFailure = createAction(
  '[Column] Load Columns Failure',
  props<{ error: unknown }>()
)

// Load one column
export const loadColumn = createAction(
  '[Column] Load Column',
  props<{ boardName: string; columnName: string }>()
)

export const loadColumnSuccess = createAction(
  '[Column] Load Column Success',
  props<{ column: Column }>()
)

export const loadColumnFailure = createAction(
  '[Column] Load Column Failure',
  props<{ error: unknown }>()
)

// Add column
export const addColumn = createAction(
  '[Column] Add Column',
  props<{ boardName: string; column: Column }>()
)

export const addColumnSuccess = createAction(
  '[Column] Add Column Success',
  props<{ column: Column }>()
)

export const addColumnFailure = createAction(
  '[Column] Add Column Failure',
  props<{ error: unknown }>()
)

// Update column
export const updateColumn = createAction(
  '[Column] Update Column',
  props<{ boardName: string; columnName: string; column: Column }>()
)

export const updateColumnSuccess = createAction(
  '[Column] Update Column Success',
  props<{ column: Column }>()
)

export const updateColumnFailure = createAction(
  '[Column] Update Column Failure',
  props<{ error: unknown }>()
)

// Delete column
export const deleteColumn = createAction(
  '[Column] Delete Column',
  props<{ boardName: string; columnName: string }>()
)

export const deleteColumnSuccess = createAction(
  '[Column] Delete Column Success',
  props<{ columnName: string }>()
)

export const deleteColumnFailure = createAction(
  '[Column] Delete Column Failure',
  props<{ error: unknown }>()
)
