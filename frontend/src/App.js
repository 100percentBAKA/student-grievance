//* main react imports 
import React from 'react'

//* native components/sections imports 
import ScrollTop from "./components/ScrollTop"
import Footer from './sections/Footer'
import Navbar from './sections/Navbar'

//* pages imports 
import Dashboard from './pages/Dashboard'
import GrievanceForm from './pages/GrievanceForm'

//* react router imports 
import { Routes, Route } from 'react-router-dom'


export default function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/form" element={<GrievanceForm />} />
      </Routes>
      <ScrollTop />
      <Footer />
    </React.Fragment>

  )
}
