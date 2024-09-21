import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as SubtaskActions from '../actions/subtasks.actions'
import { catchError, map, mergeMap, of } from 'rxjs'
import { DataService } from '../../services/data/data.service'

@Injectable()
export class SubtaskEffects {
  private actions$ = inject(Actions)
  constructor(private dataService: DataService) {}

  loadSubtasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubtaskActions.loadSubtasks),
      mergeMap(({ boardName, columnName, taskName }) =>
        of(this.dataService.getSubtasks(boardName, columnName, taskName)).pipe(
          map(subtasks => SubtaskActions.loadSubtasksSuccess({ subtasks })),
          catchError(error => of(SubtaskActions.loadSubtasksFailure({ error })))
        )
      )
    )
  )

  loadOneSubtask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubtaskActions.loadOneSubtask),
      mergeMap(({ boardName, columnName, taskName, subtaskName }) =>
        of(
          this.dataService.getSubtask(
            boardName,
            columnName,
            taskName,
            subtaskName
          )
        ).pipe(
          map(subtask => {
            if (subtask) {
              return SubtaskActions.loadOneSubtaskSuccess({ subtask })
            } else {
              return SubtaskActions.loadOneSubtaskFailure({
                error: 'Subtask not found',
              })
            }
          }),
          catchError(error =>
            of(SubtaskActions.loadOneSubtaskFailure({ error }))
          )
        )
      )
    )
  )

  addSubtask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubtaskActions.addSubtask),
      mergeMap(({ boardName, columnName, taskName, subtask }) =>
        of(
          this.dataService.addSubtask(boardName, columnName, taskName, subtask)
        ).pipe(
          map(() => SubtaskActions.addSubtaskSuccess({ subtask })),
          catchError(error => of(SubtaskActions.addSubtaskFailure({ error })))
        )
      )
    )
  )

  updateSubtask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubtaskActions.updateSubtask),
      mergeMap(({ boardName, columnName, taskName, subtask }) =>
        of(
          this.dataService.updateSubtask(
            boardName,
            columnName,
            taskName,
            subtask
          )
        ).pipe(
          map(() => SubtaskActions.updateSubtaskSuccess({ subtask })),
          catchError(error =>
            of(SubtaskActions.updateSubtaskFailure({ error }))
          )
        )
      )
    )
  )

  deleteSubtask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubtaskActions.deleteSubtask),
      mergeMap(({ boardName, columnName, taskName, subtaskName }) =>
        of(
          this.dataService.deleteSubtask(
            boardName,
            columnName,
            taskName,
            subtaskName
          )
        ).pipe(
          map(() => SubtaskActions.deleteSubtaskSuccess({ subtaskName })),
          catchError(error =>
            of(SubtaskActions.deleteSubtaskFailure({ error }))
          )
        )
      )
    )
  )
}
