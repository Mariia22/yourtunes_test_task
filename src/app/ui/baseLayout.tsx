import React from 'react'
import { AppShell } from '@mantine/core'
import { NavLink, Outlet } from 'react-router-dom'
import { navidationList } from '../appNavigation'

export const baseLayout = (
  <AppShell
    header={{ height: 60 }}
    navbar={{
      width: 300,
      breakpoint: 'sm'
    }}
    padding="md"
  >
    <AppShell.Header>Yourtunes</AppShell.Header>
    <AppShell.Navbar p="md">
      {navidationList.map((link) => (
        <NavLink key={link.id} to={link.path}>
          {link.name}
        </NavLink>
      ))}
    </AppShell.Navbar>
    <AppShell.Main style={{ display: 'flex' }}>
      <Outlet />
    </AppShell.Main>
  </AppShell>
)
