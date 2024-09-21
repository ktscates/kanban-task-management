import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './components/header/header.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { BoardComponent } from './components/board/board.component'
import { BoardModalComponent } from './components/board-modal/board-modal.component'
import { TaskModalComponent } from './components/task-modal/task-modal.component'
import { TaskModalDisplayComponent } from './components/task-modal-display/task-modal-display.component'
import { Task } from './model/model'
import { Observable } from 'rxjs'
import { ModalService } from './services/modal/modal.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    BoardComponent,
    BoardModalComponent,
    TaskModalComponent,
    TaskModalDisplayComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'kanban-task-management'
  switchedToDarkMode = false
  isBoardModalOpen$: Observable<boolean>
  isTaskModalOpen$: Observable<boolean>
  taskDisplayModal$: Observable<{ isOpen: boolean; task: Task | null }>

  constructor(private modalService: ModalService) {
    this.isBoardModalOpen$ = this.modalService.boardModalState$
    this.isTaskModalOpen$ = this.modalService.taskModalState$
    this.taskDisplayModal$ = this.modalService.taskDisplayModalState$
  }

  ngOnInit(): void {
    const theme = localStorage.getItem('darkMode')
    if (theme === 'true') {
      this.switchedToDarkMode = true
      document.body.classList.add('dark')
    }
  }

  switchThemes(): void {
    this.switchedToDarkMode = !this.switchedToDarkMode
    const body = document.querySelector('body')

    if (this.switchedToDarkMode) {
      body?.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      body?.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }

  openBoardModal(): void {
    this.modalService.openBoardModal()
  }

  closeBoardModal(): void {
    this.modalService.closeBoardModal()
  }

  openTaskModal(): void {
    this.modalService.openTaskModal()
  }

  closeTaskModal(): void {
    this.modalService.closeTaskModal()
  }

  openTaskDisplay(task: Task): void {
    this.modalService.openTaskDisplayModal(task)
  }

  closeTaskDisplay(): void {
    this.modalService.closeTaskDisplayModal()
  }
}
