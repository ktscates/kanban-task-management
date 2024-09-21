import { Component, Output, EventEmitter } from '@angular/core'
import { IconsComponent } from '../icons/icons.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() openTaskModal = new EventEmitter<void>()

  open() {
    this.openTaskModal.emit()
  }
}
