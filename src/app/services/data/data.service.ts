// src/app/services/data.service.ts
import { Injectable } from '@angular/core'
import { Board, Column, Subtask, Task } from '../../model/model'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private storageKey = 'kanbanData'
  private jsonFile = 'assets/data.json'

  // Load initial data from JSON file if localStorage is empty
  constructor(private http: HttpClient) {
    this.initializeLocalStorage()
  }

  private initializeLocalStorage(): void {
    const existingData = this.getData()
    if (!existingData.boards.length) {
      this.initializeData().subscribe(data => {
        this.saveData(data)
      })
    }
  }

  private initializeData(): Observable<Board[]> {
    return this.http.get<Board[]>(this.jsonFile)
  }

  private getData() {
    const data = localStorage.getItem(this.storageKey)
    return data ? JSON.parse(data) : { boards: [] } // Default structure
  }

  private saveData(data: object): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data))
  }

  // Boards
  getBoards(): Board[] {
    const data = this.getData()
    return data.boards || []
  }

  getBoard(name: string): Board | undefined {
    const data = this.getData()
    return data.boards.find((board: Board) => board.name === name)
  }

  addBoard(board: Board): void {
    const data = this.getData()
    data.boards.push(board)
    this.saveData(data)
  }

  updateBoard(updatedBoard: Board): void {
    const data = this.getData()
    const boardIndex = data.boards.findIndex(
      (board: Board) => board.name === updatedBoard.name
    )
    if (boardIndex > -1) {
      data.boards[boardIndex] = updatedBoard
      this.saveData(data)
    }
  }

  deleteBoard(boardName: string): void {
    const data = this.getData()
    data.boards = data.boards.filter((board: Board) => board.name !== boardName)
    this.saveData(data)
  }

  // Columns
  getColumns(boardName: string): Column[] {
    const data = this.getData()
    const board = data.boards.find((board: Board) => board.name === boardName)
    return board
      ? board.columns.map((column: Column) => ({
          ...column,
          tasks: column.tasks || [],
        }))
      : []
  }

  getColumn(boardName: string, columnName: string): Column | undefined {
    const data = this.getData()
    const board = data.boards.find((board: Board) => board.name === boardName)
    return board
      ? {
          ...board.columns.find((column: Column) => column.name === columnName),
          tasks:
            (
              board.columns.find(
                (column: Column) => column.name === columnName
              ) || {}
            ).tasks || [],
        }
      : undefined
  }

  addColumn(boardName: string, column: Column): void {
    const data = this.getData()
    const board = data.boards.find((board: Board) => board.name === boardName)
    if (board) {
      // Ensure tasks property is initialized
      const columnWithTasks = { ...column, tasks: column.tasks || [] }
      board.columns.push(columnWithTasks)
      this.saveData(data)
    }
  }

  updateColumn(boardName: string, updatedColumn: Column): void {
    const data = this.getData()
    const board = data.boards.find((board: Board) => board.name === boardName)
    if (board) {
      const columnIndex = board.columns.findIndex(
        (column: Column) => column.name === updatedColumn.name
      )
      if (columnIndex > -1) {
        // Ensure tasks property is included
        const columnWithTasks = {
          ...updatedColumn,
          tasks: updatedColumn.tasks || [],
        }
        board.columns[columnIndex] = columnWithTasks
        this.saveData(data)
      }
    }
  }

  deleteColumn(boardName: string, columnName: string): void {
    const data = this.getData()
    const board = data.boards.find((board: Board) => board.name === boardName)
    if (board) {
      board.columns = board.columns.filter(
        (column: Column) => column.name !== columnName
      )
      this.saveData(data)
    }
  }

  // Tasks
  getTasks(boardName: string, columnName: string): Task[] {
    const board = this.getBoard(boardName)
    const column = board
      ? board.columns.find((column: Column) => column.name === columnName)
      : undefined
    return column ? column.tasks : []
  }

  getTask(
    boardName: string,
    columnName: string,
    taskTitle: string
  ): Task | undefined {
    const board = this.getBoard(boardName)
    const column = board
      ? board.columns.find((column: Column) => column.name === columnName)
      : undefined
    return column
      ? column.tasks.find((task: Task) => task.title === taskTitle)
      : undefined
  }

  addTask(boardName: string, columnName: string, task: Task): void {
    const data = this.getData()
    const board = data.boards.find((board: Board) => board.name === boardName)
    if (board) {
      const column = board.columns.find(
        (column: Column) => column.name === columnName
      )
      if (column) {
        column.tasks.push(task)
        this.saveData(data)
      }
    }
  }

  updateTask(boardName: string, columnName: string, updatedTask: Task): void {
    const data = this.getData()
    const board = data.boards.find((board: Board) => board.name === boardName)
    if (board) {
      const column = board.columns.find(
        (column: Column) => column.name === columnName
      )
      if (column) {
        const taskIndex = column.tasks.findIndex(
          (task: Task) => task.title === updatedTask.title
        )
        if (taskIndex > -1) {
          column.tasks[taskIndex] = updatedTask
          this.saveData(data)
        }
      }
    }
  }

  deleteTask(boardName: string, columnName: string, taskTitle: string): void {
    const data = this.getData()
    const board = data.boards.find((board: Board) => board.name === boardName)
    if (board) {
      const column = board.columns.find(
        (column: Column) => column.name === columnName
      )
      if (column) {
        column.tasks = column.tasks.filter(
          (task: Task) => task.title !== taskTitle
        )
        this.saveData(data)
      }
    }
  }

  // Subtasks
  getSubtasks(
    boardName: string,
    columnName: string,
    taskTitle: string
  ): Subtask[] {
    const task = this.getTask(boardName, columnName, taskTitle)
    return task ? task.subtasks : []
  }

  getSubtask(
    boardName: string,
    columnName: string,
    taskTitle: string,
    subtaskTitle: string
  ): Subtask | undefined {
    const task = this.getTask(boardName, columnName, taskTitle)
    return task
      ? task.subtasks.find((subtask: Subtask) => subtask.title === subtaskTitle)
      : undefined
  }

  addSubtask(
    boardName: string,
    columnName: string,
    taskTitle: string,
    subtask: Subtask
  ): void {
    const data = this.getData()
    const board = data.boards.find((board: Board) => board.name === boardName)
    if (board) {
      const column = board.columns.find(
        (column: Column) => column.name === columnName
      )
      if (column) {
        const task = column.tasks.find((task: Task) => task.title === taskTitle)
        if (task) {
          task.subtasks.push(subtask)
          this.saveData(data)
        }
      }
    }
  }

  updateSubtask(
    boardName: string,
    columnName: string,
    taskTitle: string,
    updatedSubtask: Subtask
  ): void {
    const data = this.getData()
    const board = data.boards.find((board: Board) => board.name === boardName)
    if (board) {
      const column = board.columns.find(
        (column: Column) => column.name === columnName
      )
      if (column) {
        const task = column.tasks.find((task: Task) => task.title === taskTitle)
        if (task) {
          const subtaskIndex = task.subtasks.findIndex(
            (subtask: Subtask) => subtask.title === updatedSubtask.title
          )
          if (subtaskIndex > -1) {
            task.subtasks[subtaskIndex] = updatedSubtask
            this.saveData(data)
          }
        }
      }
    }
  }

  deleteSubtask(
    boardName: string,
    columnName: string,
    taskTitle: string,
    subtaskTitle: string
  ): void {
    const data = this.getData()
    const board = data.boards.find((board: Board) => board.name === boardName)
    if (board) {
      const column = board.columns.find(
        (column: Column) => column.name === columnName
      )
      if (column) {
        const task = column.tasks.find((task: Task) => task.title === taskTitle)
        if (task) {
          task.subtasks = task.subtasks.filter(
            (subtask: Subtask) => subtask.title !== subtaskTitle
          )
          this.saveData(data)
        }
      }
    }
  }
}
