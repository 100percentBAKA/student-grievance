//* main react imports 
import React from 'react'

//* MUI components imports 
import { ThemeProvider } from "@emotion/react"

//* native theme imports 
import theme from './theme'

//* pages imports 
import Main from './pages/Main'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Main />
      </React.Fragment>
    </ThemeProvider>
  )
}
