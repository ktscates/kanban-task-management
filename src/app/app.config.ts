import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { BoardEffects } from './store/effects/boards.effects'
import { coombinedReducers } from './store/combinedReducers'
import { ColumnEffects } from './store/effects/columns.effects'
import { TaskEffects } from './store/effects/tasks.effects'
import { SubtaskEffects } from './store/effects/subtasks.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(coombinedReducers),
    provideEffects([BoardEffects, ColumnEffects, TaskEffects, SubtaskEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
}
