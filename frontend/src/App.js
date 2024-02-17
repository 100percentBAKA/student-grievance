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
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import LoginPage from './pages/LoginPage'

// * use auth
import { useAuth } from "./hooks/useAuth"

export default function App() {
  const { isAuthenticated } = useAuth()
  const PrivateRoute = () => {
    return (
      !isAuthenticated ? <Navigate to="/login" /> : <Outlet />
    )
  }

  return (
    <React.Fragment>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<StudentDashboard />} exact />
          <Route path="/grievance/:grievanceID" element={<GrievanceDetail />} />
          <Route path="/forms" element={<GrievanceForm />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      {isAuthenticated && <ScrollTop />}
      {isAuthenticated && <Footer />}
    </React.Fragment>
  )
}
