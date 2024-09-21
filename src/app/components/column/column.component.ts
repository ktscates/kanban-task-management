import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Column, Task } from '../../model/model'

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
})
export class ColumnComponent {
  @Input() column!: Column
  @Output() taskClicked = new EventEmitter<Task>()

  onTaskClick(task: Task) {
    this.taskClicked.emit(task)
  }
}
