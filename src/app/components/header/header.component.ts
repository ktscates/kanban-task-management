import { Component, Output, EventEmitter } from '@angular/core'
import { IconsComponent } from '../icons/icons.component'
import { ModalService } from '../../services/modal/modal.service'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Board } from '../../model/model'
import { selectCurrentBoard } from '../../store/selectors/boards.selectors'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() openTaskModal = new EventEmitter<void>()
  dropdownOpen = false
  currentBoard$!: Observable<Board | null | undefined>

  constructor(
    private modalService: ModalService,
    private store: Store
  ) {
    this.currentBoard$ = this.store.select(selectCurrentBoard)
  }

  open() {
    this.openTaskModal.emit()
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen
  }

  editBoard() {
    this.currentBoard$.subscribe(board => {
      if (board) {
        this.modalService.openBoardModal()
      }
    })
  }

  deleteBoard() {
    // Implement delete board functionality
    console.log('Delete board functionality needs to be implemented')
  }
}
