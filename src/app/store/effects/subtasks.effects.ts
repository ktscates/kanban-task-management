import { inject, Injectable } from '@angular/core'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { SubtasksService } from '../../services/subtasks/subtasks.service'
import * as SubtaskActions from '../actions/subtasks.actions'
import { catchError, map, mergeMap, of } from 'rxjs'

@Injectable()
export class SubtaskEffects {
  private actions$ = inject(Actions)
  constructor(private subtasksService: SubtasksService) {}

  loadSubtasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubtaskActions.loadSubtasks),
      mergeMap(({ boardName, columnName, taskName }) =>
        this.subtasksService.getSubtasks(boardName, columnName, taskName).pipe(
          map(subtasks => SubtaskActions.loadSubtasksSuccess({ subtasks })),
          catchError(error => of(SubtaskActions.loadSubtasksFailure({ error })))
        )
      )
    )
  )

  loadSubtask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubtaskActions.loadSubtask),
      mergeMap(({ boardName, columnName, taskName, subtaskName }) =>
        this.subtasksService
          .getSubtask(boardName, columnName, taskName, subtaskName)
          .pipe(
            map(subtask => SubtaskActions.loadSubtaskSuccess({ subtask })),
            catchError(error =>
              of(SubtaskActions.loadSubtaskFailure({ error }))
            )
          )
      )
    )
  )

  addSubtask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubtaskActions.addSubtask),
      mergeMap(({ boardName, columnName, taskName, subtask }) =>
        this.subtasksService
          .addSubtask(boardName, columnName, taskName, subtask)
          .pipe(
            map(subtask => SubtaskActions.addSubtaskSuccess({ subtask })),
            catchError(error => of(SubtaskActions.addSubtaskFailure({ error })))
          )
      )
    )
  )

  updateSubtask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubtaskActions.updateSubtask),
      mergeMap(({ boardName, columnName, taskName, subtaskName, subtask }) =>
        this.subtasksService
          .updateSubtask(boardName, columnName, taskName, subtaskName, subtask)
          .pipe(
            map(subtask => SubtaskActions.updateSubtaskSuccess({ subtask })),
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
        this.subtasksService
          .deleteSubtask(boardName, columnName, taskName, subtaskName)
          .pipe(
            map(() => SubtaskActions.deleteSubtaskSuccess({ subtaskName })),
            catchError(error =>
              of(SubtaskActions.deleteSubtaskFailure({ error }))
            )
          )
      )
    )
  )
}
