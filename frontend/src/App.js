//* main react imports 
import React from 'react'

//* native components/sections imports 
import ScrollTop from "./components/ui/ScrollTop"
import Footer from './components/Footer'
import Navbar from './components/Navbar'

//* pages imports 
import StudentDashboard from './pages/StudentDashboard'
import GrievanceDetail from './pages/GrievanceDetail'
import GrievanceForm from './pages/GrievanceForm'

//* react router imports 
import { Routes, Route } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'


export default function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/grievance/:grievanceID" element={<GrievanceDetail />} />
        <Route path="/forms" element={<GrievanceForm />} />
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      <ScrollTop />
      <Footer />
    </React.Fragment>

  )
}
