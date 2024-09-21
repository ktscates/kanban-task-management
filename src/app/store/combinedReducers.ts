import { ActionReducerMap } from '@ngrx/store'
import { boardReducer } from './reducers/boards.reducers'
import { AppState } from '../model/model'
import { columnReducer } from './reducers/columns.reducers'
import { taskReducer } from './reducers/tasks.reducers'
import { subtaskReducer } from './reducers/subtasks.reducers'

export const coombinedReducers: ActionReducerMap<AppState> = {
  boards: boardReducer,
  columns: columnReducer,
  tasks: taskReducer,
  subtasks: subtaskReducer,
}
