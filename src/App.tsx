import React from 'react'
import '@mantine/core/styles.css'
import { MantineProvider, Button } from '@mantine/core'

export const App: React.FC = () => {
  return (
    <MantineProvider>
      <Button component="a" href="https://mantine.dev/" target="_blank">
        Mantine website
      </Button>
    </MantineProvider>
  )
}
