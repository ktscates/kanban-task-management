import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { IconsComponent } from '../icons/icons.component'
import { Store } from '@ngrx/store'
import * as BoardActions from '../../store/actions/boards.actions'
import { Board } from '../../model/model'
import { Observable } from 'rxjs'
import {
  selectAllBoards,
  selectBoardTotal,
} from '../../store/selectors/boards.selectors'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IconsComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  @Input() switchThemes!: () => void
  @Input() isDarkMode!: boolean
  @Output() boardSelected = new EventEmitter<Board>()
  @Output() openBoardModal = new EventEmitter<void>()

  boards$: Observable<Board[]>
  totalBoard$: Observable<number>

  constructor(private store: Store) {
    this.boards$ = this.store.select(selectAllBoards)
    this.totalBoard$ = this.store.select(selectBoardTotal)
  }
  ngOnInit(): void {
    this.store.dispatch(BoardActions.loadBoards())
  }

  selectBoard(board: Board): void {
    this.store.dispatch(BoardActions.loadBoard({ boardName: board.name }))
    this.boardSelected.emit(board)
    console.log('button clicked!', board)
  }

  open() {
    this.openBoardModal.emit()
  }
}
