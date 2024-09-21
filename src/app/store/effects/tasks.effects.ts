import { Injectable, inject } from '@angular/core'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { TasksService } from '../../services/tasks/tasks.service'
import * as TaskActions from '../actions/tasks.actions'
import { catchError, map, mergeMap, of } from 'rxjs'

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions)

  constructor(private tasksService: TasksService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(({ boardName, columnName }) =>
        this.tasksService.getTasks(boardName, columnName).pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TaskActions.loadTasksFailure({ error })))
        )
      )
    )
  )

  loadTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTask),
      mergeMap(({ boardName, columnName, taskName }) =>
        this.tasksService.getTask(boardName, columnName, taskName).pipe(
          map(task => TaskActions.loadTaskSuccess({ task })),
          catchError(error => of(TaskActions.loadTaskFailure({ error })))
        )
      )
    )
  )

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap(({ boardName, columnName, task }) =>
        this.tasksService.addTask(boardName, columnName, task).pipe(
          map(task => TaskActions.addTaskSuccess({ task })),
          catchError(error => of(TaskActions.addTaskFailure({ error })))
        )
      )
    )
  )

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(({ boardName, columnName, taskName, task }) =>
        this.tasksService
          .updateTask(boardName, columnName, taskName, task)
          .pipe(
            map(task => TaskActions.updateTaskSuccess({ task })),
            catchError(error => of(TaskActions.updateTaskFailure({ error })))
          )
      )
    )
  )

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(({ boardName, columnName, taskName }) =>
        this.tasksService.deleteTask(boardName, columnName, taskName).pipe(
          map(() => TaskActions.deleteTaskSuccess({ taskName })),
          catchError(error => of(TaskActions.deleteTaskFailure({ error })))
        )
      )
    )
  )
}
