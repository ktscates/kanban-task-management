import { Component } from '@angular/core'
import { IconsComponent } from '../icons/icons.component'
import { ModalService } from '../../services/modal/modal.service'

@Component({
  selector: 'app-board-modal',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './board-modal.component.html',
  styleUrl: './board-modal.component.css',
})
export class BoardModalComponent {
  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.closeBoardModal()
  }
}
