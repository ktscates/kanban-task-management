import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Column } from '../../model/model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  private API_URL = `${environment.apiUrl}/boards`

  constructor(private http: HttpClient) {}

  getColumns(boardName: string): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.API_URL}/${boardName}/columns`)
  }

  getColumn(boardName: string, columnName: string): Observable<Column> {
    return this.http.get<Column>(
      `${this.API_URL}/${boardName}/columns/${columnName}`
    )
  }

  addColumn(boardName: string, column: Column): Observable<Column> {
    return this.http.post<Column>(
      `${this.API_URL}/${boardName}/columns`,
      column
    )
  }

  updateColumn(
    boardName: string,
    columnName: string,
    column: Column
  ): Observable<Column> {
    return this.http.put<Column>(
      `${this.API_URL}/${boardName}/columns/${columnName}`,
      column
    )
  }

  deleteColumn(boardName: string, columnName: string): Observable<Column> {
    return this.http.delete<Column>(
      `${this.API_URL}/${boardName}/columns/${columnName}`
    )
  }
}
