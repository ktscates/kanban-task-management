import { createFeatureSelector, createSelector } from '@ngrx/store'
import { boardAdapter, BoardState } from '../reducers/boards.reducers'

export const selectBoardState = createFeatureSelector<BoardState>('boards')

export const {
  selectAll: selectAllBoards,
  selectEntities: selectBoardEntities,
  selectIds: selectBoardIds,
  selectTotal: selectBoardTotal,
} = boardAdapter.getSelectors(selectBoardState)

// Select a single board
export const selectCurrentBoard = createSelector(
  selectBoardState,
  (state: BoardState) => state.selectedBoard
)

export const selectBoardLoading = createSelector(
  selectBoardState,
  (state: BoardState) => state.loading
)

export const selectBoardError = createSelector(
  selectBoardState,
  (state: BoardState) => state.error
)
