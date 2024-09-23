import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms'
import { ModalService } from '../../services/modal/modal.service'
import { Observable } from 'rxjs'
import { Board, Column } from '../../model/model'
import { Store } from '@ngrx/store'
import * as BoardsActions from '../../store/actions/boards.actions'
import * as ColumnsActions from '../../store/actions/columns.actions'
import * as BoardsSelectors from '../../store/selectors/boards.selectors'
import { IconsComponent } from '../icons/icons.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-board-modal',
  standalone: true,
  imports: [IconsComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.css'],
})
export class BoardModalComponent implements OnInit {
  boardForm!: FormGroup
  loading$!: Observable<boolean>
  error$!: Observable<unknown>
  currentBoard$!: Observable<Board | null | undefined>
  isEditMode = false

  get columns(): FormArray {
    return this.boardForm.get('columns') as FormArray
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
      columns: this.fb.array([]),
    })

    this.currentBoard$ = this.store.select(BoardsSelectors.selectCurrentBoard)

    this.currentBoard$.subscribe(board => {
      if (board) {
        this.isEditMode = true
        this.boardForm.patchValue({ name: board.name })
        this.setColumns(board.columns)
      } else {
        this.isEditMode = false
        this.boardForm.reset()
        this.columns.clear()
      }
    })
  }

  createColumn(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    })
  }

  addColumnInput() {
    this.columns.push(this.createColumn())
    console.log('Columns after adding:', this.columns.value)
  }

  removeColumnInput(index: number) {
    this.columns.removeAt(index)
  }

  setColumns(columns: Column[]) {
    const columnFGs = columns.map(column =>
      this.fb.group({
        name: [column.name, Validators.required],
      })
    )
    this.boardForm.setControl('columns', this.fb.array(columnFGs))
  }

  close() {
    this.modalService.closeBoardModal()
  }

  onSave() {
    const board: Board = this.boardForm.value

    console.log('Form Submission:', this.boardForm.value)

    if (this.isEditMode) {
      this.store.dispatch(BoardsActions.updateBoard({ board }))
    } else {
      this.store.dispatch(BoardsActions.addBoard({ board }))
    }

    const columns = this.columns.value as Column[]
    console.log('Columns to be saved:', columns)

    if (this.isEditMode) {
      columns.forEach(column => {
        this.store.dispatch(
          ColumnsActions.updateColumn({
            boardName: board.name,
            column: {
              ...column,
              tasks: [],
            },
          })
        )
      })
    } else {
      // Dispatch actions for each column
      columns.forEach(column => {
        this.store.dispatch(
          ColumnsActions.addColumn({
            boardName: board.name,
            column: {
              ...column,
              tasks: [],
            },
          })
        )
      })
    }

    // Close the modal after saving
    this.close()
  }
}
