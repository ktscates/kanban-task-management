// reducers/board.reducer.ts
import { createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { Board } from '../../model/model'
import * as BoardActions from '../actions/boards.actions'

// NgRx Entity adapter for Board
export const boardAdapter = createEntityAdapter<Board>({
  selectId: board => board.name,
})

export interface BoardState extends EntityState<Board> {
  loading: boolean
  error: unknown
  selectedBoard?: Board | null
}

export const initialBoardState: BoardState = boardAdapter.getInitialState({
  loading: false,
  error: null,
  selectedBoard: null,
})

export const boardReducer = createReducer(
  initialBoardState,

  // Clear current board
  on(BoardActions.clearCurrentBoard, state => ({
    ...state,
    selectedBoard: null,
  })),

  // Load Boards
  on(BoardActions.loadBoards, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BoardActions.loadBoardsSuccess, (state, { boards }) =>
    boardAdapter.setAll(boards, {
      ...state,
      loading: false,
    })
  ),
  on(BoardActions.loadBoardsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load Board
  on(BoardActions.loadBoard, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BoardActions.loadBoardSuccess, (state, { board }) =>
    boardAdapter.upsertOne(board, {
      ...state,
      loading: false,
      selectedBoard: board,
    })
  ),
  on(BoardActions.loadBoardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Board
  on(BoardActions.addBoardSuccess, (state, { board }) =>
    boardAdapter.addOne(board, state)
  ),

  // Update Board
  on(BoardActions.updateBoardSuccess, (state, { board }) =>
    boardAdapter.upsertOne(board, state)
  ),

  // Delete Board
  on(BoardActions.deleteBoardSuccess, (state, { boardName }) =>
    boardAdapter.removeOne(boardName, state)
  )
)
