import { createAction, props } from '@ngrx/store'
import { Board } from '../../model/model'

// Load All Boards
export const loadBoards = createAction('[Board List] Load Boards')
export const loadBoardsSuccess = createAction(
  '[Board List] Load Boards Success',
  props<{ boards: Board[] }>()
)
export const loadBoardsFailure = createAction(
  '[Board List] Load Boards Failure',
  props<{ error: unknown }>()
)

// Load one Board
export const loadBoard = createAction(
  '[Board Detail] Load Board',
  props<{ name: string }>()
)

export const loadBoardSuccess = createAction(
  '[Board Detail] Load Board Success',
  props<{ board: Board }>()
)

export const loadBoardFailure = createAction(
  '[Board Detail] Load Board Failure',
  props<{ error: unknown }>()
)

// Create Board
export const addBoard = createAction(
  '[Board List] Add Board',
  props<{ board: Board }>()
)
export const addBoardSuccess = createAction(
  '[Board List] Add Board Success',
  props<{ board: Board }>()
)
export const addBoardFailure = createAction(
  '[Board List] Add Board Failure',
  props<{ error: unknown }>()
)

// Update Board
export const updateBoard = createAction(
  '[Board List] Update Board',
  props<{ board: Board }>()
)
export const updateBoardSuccess = createAction(
  '[Board List] Update Board Success',
  props<{ board: Board }>()
)
export const updateBoardFailure = createAction(
  '[Board List] Update Board Failure',
  props<{ error: unknown }>()
)

// Delete Board
export const deleteBoard = createAction(
  '[Board List] Delete Board',
  props<{ boardId: string }>()
)
export const deleteBoardSuccess = createAction(
  '[Board List] Delete Board Success',
  props<{ boardId: string }>()
)
export const deleteBoardFailure = createAction(
  '[Board List] Delete Board Failure',
  props<{ error: unknown }>()
)
