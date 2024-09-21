// src/app/store/column/column.actions.ts
import { createAction, props } from '@ngrx/store'
import { Column } from '../../model/model'

// Load all columns
export const loadColumns = createAction(
  '[Column] Load Columns',
  props<{ boardName: string }>() // Corrected to include boardName
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
export const loadOneColumn = createAction(
  '[Column] Load One Column',
  props<{ boardName: string; columnName: string }>()
)

export const loadOneColumnSuccess = createAction(
  '[Column] Load One Column Success',
  props<{ column: Column }>()
)

export const loadOneColumnFailure = createAction(
  '[Column] Load One Column Failure',
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
  props<{ boardName: string; column: Column }>()
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
