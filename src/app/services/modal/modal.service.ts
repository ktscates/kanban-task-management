// modal.service.ts
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Task } from '../../model/model'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private boardModalSubject = new BehaviorSubject<boolean>(false)
  private taskModalSubject = new BehaviorSubject<boolean>(false)
  private taskDisplayModalSubject = new BehaviorSubject<{
    isOpen: boolean
    task: Task | null
  }>({ isOpen: false, task: null })

  boardModalState$ = this.boardModalSubject.asObservable()
  taskModalState$ = this.taskModalSubject.asObservable()
  taskDisplayModalState$ = this.taskDisplayModalSubject.asObservable()

  openBoardModal() {
    this.boardModalSubject.next(true)
  }

  closeBoardModal() {
    this.boardModalSubject.next(false)
  }

  openTaskModal() {
    this.taskModalSubject.next(true)
  }

  closeTaskModal() {
    this.taskModalSubject.next(false)
  }

  openTaskDisplayModal(task: Task) {
    this.taskDisplayModalSubject.next({ isOpen: true, task })
  }

  closeTaskDisplayModal() {
    this.taskDisplayModalSubject.next({ isOpen: false, task: null })
  }
}
