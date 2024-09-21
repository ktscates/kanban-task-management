import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject, Injectable } from '@angular/core'
import * as BoardActions from '../actions/boards.actions'
import { catchError, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { DataService } from '../../services/data/data.service'

@Injectable()
export class BoardEffects {
  private actions$ = inject(Actions)
  constructor(private dataService: DataService) {}

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      mergeMap(() => {
        const boards = this.dataService.getBoards()
        return of(BoardActions.loadBoardsSuccess({ boards }))
      }),
      catchError(error => of(BoardActions.loadBoardsFailure({ error })))
    )
  )

  loadBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoard),
      mergeMap(action => {
        const board = this.dataService.getBoard(action.boardName)
        if (!board) {
          return of(BoardActions.loadBoardFailure({ error: 'Board not found' }))
        }
        return of(BoardActions.loadBoardSuccess({ board }))
      }),
      catchError(error => of(BoardActions.loadBoardFailure({ error })))
    )
  )

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.addBoard),
      mergeMap(action => {
        this.dataService.addBoard(action.board)
        return of(BoardActions.addBoardSuccess({ board: action.board }))
      }),
      catchError(error => of(BoardActions.addBoardFailure({ error })))
    )
  )

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.updateBoard),
      mergeMap(action => {
        const existingBoard = this.dataService.getBoard(action.board.name)
        if (!existingBoard) {
          return of(
            BoardActions.updateBoardFailure({ error: 'Board not found' })
          )
        }

        this.dataService.updateBoard(action.board)

        return of(BoardActions.updateBoardSuccess({ board: action.board }))
      }),
      catchError(error => of(BoardActions.updateBoardFailure({ error })))
    )
  )

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.deleteBoard),
      mergeMap(action => {
        this.dataService.deleteBoard(action.boardName)
        return of(
          BoardActions.deleteBoardSuccess({ boardName: action.boardName })
        )
      }),
      catchError(error => of(BoardActions.deleteBoardFailure({ error })))
    )
  )
}
