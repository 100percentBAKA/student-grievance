//* main react imports 
import React from 'react'

//* MUI components imports 
import { ThemeProvider } from "@emotion/react"

//* native theme imports 
import theme from './theme'

//* pages imports 
import MainDashboardPage from './pages/Dashboard/MainDashboardPage'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <MainDashboardPage />
      </React.Fragment>
    </ThemeProvider>
  )
}
