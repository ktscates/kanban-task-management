import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Subtask } from '../../model/model'

@Injectable({
  providedIn: 'root',
})
export class SubtasksService {
  private API_URL = `${environment.apiUrl}/boards`

  constructor(private http: HttpClient) {}

  getSubtasks(
    boardName: string,
    columnName: string,
    taskName: string
  ): Observable<Subtask[]> {
    return this.http.get<Subtask[]>(
      `${this.API_URL}/${boardName}/columns/${columnName}/tasks/${taskName}/subtasks`
    )
  }

  getSubtask(
    boardName: string,
    columnName: string,
    taskName: string,
    subtaskName: string
  ): Observable<Subtask> {
    return this.http.get<Subtask>(
      `${this.API_URL}/${boardName}/columns/${columnName}/tasks/${taskName}/subtasks/${subtaskName}`
    )
  }

  addSubtask(
    boardName: string,
    columnName: string,
    taskName: string,
    subtask: Subtask
  ): Observable<Subtask> {
    return this.http.post<Subtask>(
      `${this.API_URL}/${boardName}/columns/${columnName}/tasks/${taskName}/subtasks`,
      subtask
    )
  }

  updateSubtask(
    boardName: string,
    columnName: string,
    taskName: string,
    subtaskName: string,
    subtask: Subtask
  ): Observable<Subtask> {
    return this.http.put<Subtask>(
      `${this.API_URL}/${boardName}/columns/${columnName}/tasks/${taskName}/subtasks/${subtaskName}`,
      subtask
    )
  }

  deleteSubtask(
    boardName: string,
    columnName: string,
    taskName: string,
    subtaskName: string
  ): Observable<Subtask> {
    return this.http.delete<Subtask>(
      `${this.API_URL}/${boardName}/columns/${columnName}/tasks/${taskName}/subtasks/${subtaskName}`
    )
  }
}
