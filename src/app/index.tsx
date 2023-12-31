import React from 'react'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { store } from './appStore'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRouter'

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MantineProvider>
        <RouterProvider router={appRouter()} />
      </MantineProvider>
    </Provider>
  )
}
