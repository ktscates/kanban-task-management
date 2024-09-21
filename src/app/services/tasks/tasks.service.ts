import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs'
import { Task } from '../../model/model'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private API_URL = `${environment.apiUrl}/boards`

  constructor(private http: HttpClient) {}

  getTasks(boardName: string, columnName: string): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${this.API_URL}/${boardName}/columns/${columnName}/tasks`
    )
  }

  getTask(
    boardName: string,
    columnName: string,
    taskName: string
  ): Observable<Task> {
    return this.http.get<Task>(
      `${this.API_URL}/${boardName}/columns/${columnName}/tasks/${taskName}`
    )
  }

  addTask(boardName: string, columnName: string, task: Task): Observable<Task> {
    return this.http.post<Task>(
      `${this.API_URL}/${boardName}/columns/${columnName}/tasks`,
      task
    )
  }

  updateTask(
    boardName: string,
    columnName: string,
    taskName: string,
    task: Task
  ): Observable<Task> {
    return this.http.put<Task>(
      `${this.API_URL}/${boardName}/columns/${columnName}/tasks/${taskName}`,
      task
    )
  }

  deleteTask(
    boardName: string,
    columnName: string,
    taskName: string
  ): Observable<Task> {
    return this.http.delete<Task>(
      `${this.API_URL}/${boardName}/columns/${columnName}/tasks/${taskName}`
    )
  }
}
