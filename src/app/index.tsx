import React from 'react'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { ReleasesPage } from '../pages/releases'
import { Provider } from 'react-redux'
import { store } from './appStore'

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MantineProvider>
        <ReleasesPage />
      </MantineProvider>
    </Provider>
  )
}
