import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { baseLayout } from './ui/baseLayout'
import { ReleasePage } from '../pages/release/ui/Page'
import { AddRealesePage } from '../pages/addRelease'
import { MainPage } from '../pages/main'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const appRouter = () =>
  createBrowserRouter([
    {
      element: baseLayout,
      errorElement: <div>error</div>,

      children: [
        {
          path: '/',
          element: <MainPage />
        },
        {
          path: '/release/:releaseId',
          element: <ReleasePage />
        },
        {
          path: '/release/add',
          element: <AddRealesePage />
        }
      ]
    }
  ])
