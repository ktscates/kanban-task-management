import { createFeatureSelector, createSelector } from '@ngrx/store'
import { adapter, BoardState } from '../reducers/boards.reducers'

export const selectBoardState = createFeatureSelector<BoardState>('boards')

export const {
  selectAll: selectAllBoards,
  selectEntities: selectBoardEntities,
  selectIds: selectBoardIds,
  selectTotal: selectBoardTotal,
} = adapter.getSelectors(selectBoardState)

// Select a single board (from selectedBoard in state)
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
