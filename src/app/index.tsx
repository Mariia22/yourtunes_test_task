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

// TODO: logic of the add/edit/delete and add errors/notifications:

// Add: preview or error's info with sad smile. Add modal with 2 buttons "Download one more" or "Go to main"
// Edit: on the modal
// Delete: success and button on main
// Replace my code to yup
