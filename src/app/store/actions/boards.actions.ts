// actions/board.actions.ts
import { createAction, props } from '@ngrx/store'
import { Board } from '../../model/model'

export const clearCurrentBoard = createAction('[Board] Clear Current Board')

export const loadBoards = createAction('[Board] Load Boards')
export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ boards: Board[] }>()
)
export const loadBoardsFailure = createAction(
  '[Board] Load Boards Failure',
  props<{ error: unknown }>()
)

// Load Board
export const loadBoard = createAction(
  '[Board] Load Board',
  props<{ boardName: string }>()
)
export const loadBoardSuccess = createAction(
  '[Board] Load Board Success',
  props<{ board: Board }>()
)
export const loadBoardFailure = createAction(
  '[Board] Load Board Failure',
  props<{ error: unknown }>()
)

export const addBoard = createAction(
  '[Board] Add Board',
  props<{ board: Board }>()
)
export const addBoardSuccess = createAction(
  '[Board] Add Board Success',
  props<{ board: Board }>()
)
export const addBoardFailure = createAction(
  '[Board] Add Board Failure',
  props<{ error: unknown }>()
)

export const updateBoard = createAction(
  '[Board] Update Board',
  props<{ board: Board }>()
)

export const updateBoardSuccess = createAction(
  '[Board] Update Board Success',
  props<{ board: Board }>()
)

export const updateBoardFailure = createAction(
  '[Board] Update Board Failure',
  props<{ error: unknown }>()
)

export const deleteBoard = createAction(
  '[Board] Delete Board',
  props<{ boardName: string }>()
)
export const deleteBoardSuccess = createAction(
  '[Board] Delete Board Success',
  props<{ boardName: string }>()
)
export const deleteBoardFailure = createAction(
  '[Board] Delete Board Failure',
  props<{ error: unknown }>()
)
