import { configureStore } from '@reduxjs/toolkit'
import { releaseApi } from '../entities/release/api/releaseApi'

export const store = configureStore({
  reducer: {
    [releaseApi.reducerPath]: releaseApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(releaseApi.middleware)
})
