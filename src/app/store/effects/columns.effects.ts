// src/app/store/column/column.effects.ts
import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as ColumnActions from '../actions/columns.actions'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { DataService } from '../../services/data/data.service'

@Injectable()
export class ColumnEffects {
  private actions$ = inject(Actions)
  constructor(private dataService: DataService) {}

  loadColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.loadColumns),
      mergeMap(({ boardName }) =>
        of(this.dataService.getColumns(boardName)).pipe(
          map(columns => ColumnActions.loadColumnsSuccess({ columns })),
          catchError(error => of(ColumnActions.loadColumnsFailure({ error })))
        )
      )
    )
  )

  loadOneColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.loadOneColumn),
      mergeMap(({ boardName, columnName }) =>
        of(this.dataService.getColumn(boardName, columnName)).pipe(
          map(column => {
            if (column) {
              return ColumnActions.loadOneColumnSuccess({ column })
            } else {
              return ColumnActions.loadOneColumnFailure({
                error: 'Column not found',
              })
            }
          }),
          catchError(error => of(ColumnActions.loadOneColumnFailure({ error })))
        )
      )
    )
  )

  addColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.addColumn),
      mergeMap(({ boardName, column }) =>
        of(this.dataService.addColumn(boardName, column)).pipe(
          map(() => ColumnActions.addColumnSuccess({ column })),
          catchError(error => of(ColumnActions.addColumnFailure({ error })))
        )
      )
    )
  )

  updateColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.updateColumn),
      mergeMap(({ boardName, column }) =>
        of(this.dataService.updateColumn(boardName, column)).pipe(
          map(() => ColumnActions.updateColumnSuccess({ column })),
          catchError(error => of(ColumnActions.updateColumnFailure({ error })))
        )
      )
    )
  )

  deleteColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.deleteColumn),
      mergeMap(({ boardName, columnName }) =>
        of(this.dataService.deleteColumn(boardName, columnName)).pipe(
          map(() => ColumnActions.deleteColumnSuccess({ columnName })),
          catchError(error => of(ColumnActions.deleteColumnFailure({ error })))
        )
      )
    )
  )
}
