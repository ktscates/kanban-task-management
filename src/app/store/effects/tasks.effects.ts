import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as TaskActions from '../actions/tasks.actions'
import { catchError, map, mergeMap, of } from 'rxjs'
import { DataService } from '../../services/data/data.service'

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions)
  constructor(private dataService: DataService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(({ boardName, columnName }) =>
        of(this.dataService.getTasks(boardName, columnName)).pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TaskActions.loadTasksFailure({ error })))
        )
      )
    )
  )

  loadOneTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadOneTask),
      mergeMap(({ boardName, columnName, taskName }) =>
        of(this.dataService.getTask(boardName, columnName, taskName)).pipe(
          map(task => {
            if (task) {
              return TaskActions.loadOneTaskSuccess({ task })
            } else {
              return TaskActions.loadOneTaskFailure({ error: 'Task not found' })
            }
          }),
          catchError(error => of(TaskActions.loadOneTaskFailure({ error })))
        )
      )
    )
  )

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap(({ boardName, columnName, task }) =>
        of(this.dataService.addTask(boardName, columnName, task)).pipe(
          map(() => TaskActions.addTaskSuccess({ task })),
          catchError(error => of(TaskActions.addTaskFailure({ error })))
        )
      )
    )
  )

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(({ boardName, columnName, task }) =>
        of(this.dataService.updateTask(boardName, columnName, task)).pipe(
          map(() => TaskActions.updateTaskSuccess({ task })),
          catchError(error => of(TaskActions.updateTaskFailure({ error })))
        )
      )
    )
  )

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(({ boardName, columnName, taskName }) =>
        of(this.dataService.deleteTask(boardName, columnName, taskName)).pipe(
          map(() => TaskActions.deleteTaskSuccess({ taskName })),
          catchError(error => of(TaskActions.deleteTaskFailure({ error })))
        )
      )
    )
  )
}
