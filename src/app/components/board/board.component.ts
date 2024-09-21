import { Component } from '@angular/core'
import { ColumnComponent } from '../column/column.component'
import { Store } from '@ngrx/store'
import { selectCurrentBoard } from '../../store/selectors/boards.selectors'
import { Observable } from 'rxjs'
import { Board, Task } from '../../model/model'
import { CommonModule } from '@angular/common'
import { ModalService } from '../../services/modal/modal.service'

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ColumnComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  selectedBoard$: Observable<Board | null | undefined>

  constructor(
    private store: Store,
    private modalService: ModalService
  ) {
    this.selectedBoard$ = this.store.select(selectCurrentBoard)
  }

  onTaskSelect(task: Task) {
    this.modalService.openTaskDisplayModal(task)
  }
}
