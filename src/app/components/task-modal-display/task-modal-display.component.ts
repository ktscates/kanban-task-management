import { Component, Output, Input, EventEmitter } from '@angular/core'
import { IconsComponent } from '../icons/icons.component'
import { Task } from '../../model/model'

@Component({
  selector: 'app-task-modal-display',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './task-modal-display.component.html',
  styleUrl: './task-modal-display.component.css',
})
export class TaskModalDisplayComponent {
  @Input() selectedTask!: Task | null
  @Output() closeTaskDisplay = new EventEmitter<void>()

  closeModal() {
    this.closeTaskDisplay.emit()
  }
}
