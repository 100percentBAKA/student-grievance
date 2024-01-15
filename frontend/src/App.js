//* main react imports 
import React from 'react'

//* MUI components imports 
import { ThemeProvider } from "@emotion/react"

//* native theme imports 
import theme from './theme'

//* native components/sections imports 
import ScrollTop from "./components/ScrollTop"
import Footer from './sections/Footer'

//* pages imports 
import Dashboard from './pages/Dashboard'
import GrievanceForm from './pages/GrievanceForm'

//* react router imports 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './sections/Navbar'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/form" element={<GrievanceForm />} />
          </Routes>
          <ScrollTop />
          <Footer />
        </Router>
      </React.Fragment>
    </ThemeProvider>
  )
}
