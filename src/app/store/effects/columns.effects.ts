import { Injectable, inject } from '@angular/core'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { ColumnsService } from '../../services/columns/columns.service'
import * as ColumnActions from '../actions/columns.actions'
import { catchError, map, mergeMap, of } from 'rxjs'

@Injectable()
export class ColumnEffects {
  private actions$ = inject(Actions)
  constructor(private columnsService: ColumnsService) {}

  loadColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.loadColumns),
      mergeMap(({ boardName }) =>
        this.columnsService.getColumns(boardName).pipe(
          map(columns => ColumnActions.loadColumnsSuccess({ columns })),
          catchError(error => of(ColumnActions.loadColumnsFailure({ error })))
        )
      )
    )
  )

  loadColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.loadColumn),
      mergeMap(({ boardName, columnName }) =>
        this.columnsService.getColumn(boardName, columnName).pipe(
          map(column => ColumnActions.loadColumnSuccess({ column })),
          catchError(error => of(ColumnActions.loadColumnFailure({ error })))
        )
      )
    )
  )
}
