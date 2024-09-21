import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject, Injectable } from '@angular/core'
import { BoardsService } from '../../services/boards/boards.service'
import * as BoardActions from '../actions/boards.actions'
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class BoardEffects {
  private actions$ = inject(Actions)
  constructor(
    private boardsService: BoardsService
    // private actions: Actions
  ) {
    // console.log(this.actions.pipe())
  }

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      switchMap(() =>
        this.boardsService.getBoards().pipe(
          map(boards => BoardActions.loadBoardsSuccess({ boards })),
          catchError(error => of(BoardActions.loadBoardsFailure({ error })))
        )
      )
    )
  )

  loadBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoard),
      mergeMap(({ name }) =>
        this.boardsService.getBoard(name).pipe(
          map(board => BoardActions.loadBoardSuccess({ board })),
          catchError(error => of(BoardActions.loadBoardFailure({ error })))
        )
      )
    )
  )

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.addBoard),
      mergeMap(({ board }) =>
        this.boardsService.createBoard(board).pipe(
          map(newBoard => BoardActions.addBoardSuccess({ board: newBoard })),
          catchError(error => of(BoardActions.addBoardFailure({ error })))
        )
      )
    )
  )

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.updateBoard),
      mergeMap(({ board }) =>
        this.boardsService.updateBoard(board.name, board).pipe(
          map(updatedBoard =>
            BoardActions.updateBoardSuccess({ board: updatedBoard })
          ),
          catchError(error => of(BoardActions.updateBoardFailure({ error })))
        )
      )
    )
  )

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.deleteBoard),
      mergeMap(({ boardId }) =>
        this.boardsService.deleteBoard(boardId).pipe(
          map(() => BoardActions.deleteBoardSuccess({ boardId })),
          catchError(error => of(BoardActions.deleteBoardFailure({ error })))
        )
      )
    )
  )
}
