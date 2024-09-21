import { createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Board } from '../../model/model'
import * as BoardActions from '../actions/boards.actions'

export interface BoardState extends EntityState<Board> {
  loading: boolean
  selectedBoard?: Board | null
  error: unknown
}

export const adapter: EntityAdapter<Board> = createEntityAdapter<Board>({
  selectId: (board: Board) => board.name, // Assuming name is unique
})

export const initialState: BoardState = adapter.getInitialState({
  loading: false,
  selectedBoard: null,
  error: null,
})

export const boardReducer = createReducer(
  initialState,
  // Load Boards
  on(BoardActions.loadBoards, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BoardActions.loadBoardsSuccess, (state, { boards }) =>
    adapter.setAll(boards, {
      ...state,
      loading: false,
    })
  ),
  on(BoardActions.loadBoardsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load One Board
  on(BoardActions.loadBoard, state => ({
    ...state,
    loading: true,
    selectedBoard: null,
    error: null,
  })),
  on(BoardActions.loadBoardSuccess, (state, { board }) => ({
    ...state,
    loading: false,
    selectedBoard: board,
  })),
  on(BoardActions.loadBoardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Board
  on(BoardActions.addBoardSuccess, (state, { board }) =>
    adapter.addOne(board, state)
  ),
  on(BoardActions.addBoardFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Update Board
  on(BoardActions.updateBoardSuccess, (state, { board }) =>
    adapter.updateOne({ id: board.name, changes: board }, state)
  ),
  on(BoardActions.updateBoardFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Delete Board
  on(BoardActions.deleteBoardSuccess, (state, { boardId }) =>
    adapter.removeOne(boardId, state)
  ),
  on(BoardActions.deleteBoardFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)
