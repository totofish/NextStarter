import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { setupListeners } from '@reduxjs/toolkit/query'
import api from '../services/api'
import IPApi from '../services/ipApi'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [IPApi.reducerPath]: IPApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(api.middleware, IPApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})
setupListeners(store.dispatch)

export const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export const wrapper = createWrapper<AppStore>(makeStore)
