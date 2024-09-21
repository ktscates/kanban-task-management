import { Component, Output, EventEmitter } from '@angular/core'
import { IconsComponent } from '../icons/icons.component'
import { ModalService } from '../../services/modal/modal.service'

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
})
export class TaskModalComponent {
  @Output() closeTaskModal = new EventEmitter<void>()

  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.closeTaskModal()
  }
}
