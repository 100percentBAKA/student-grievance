//* main react imports 
import React from 'react'

//* native components/sections imports 
import ScrollTop from "./components/ScrollTop"
import Footer from './sections/Footer'
import Navbar from './sections/Navbar'

//* pages imports 
import Dashboard from './pages/Dashboard'
import GrievancePortal from './pages/GrievancePortal'
import GrievanceForm from './pages/GrievanceForm'

//* react router imports 
import { Routes, Route } from 'react-router-dom'
import PageNotFound from './sections/PageNotFound'


export default function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/grievance/:grievanceID" element={<GrievancePortal />} />
        <Route path="/forms" element={<GrievanceForm />} />
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      <ScrollTop />
      <Footer />
    </React.Fragment>

  )
}
