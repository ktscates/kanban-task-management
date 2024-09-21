import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Board } from '../../model/model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private API_URL = `${environment.apiUrl}/boards`

  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.API_URL)
  }

  getBoard(name: string): Observable<Board> {
    return this.http.get<Board>(`${this.API_URL}/${name}`)
  }

  createBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(this.API_URL, board)
  }

  updateBoard(name: string, board: Board): Observable<Board> {
    return this.http.put<Board>(`${this.API_URL}/${name}`, board)
  }

  deleteBoard(name: string): Observable<Board> {
    return this.http.delete<Board>(`${this.API_URL}/${name}`)
  }
}
