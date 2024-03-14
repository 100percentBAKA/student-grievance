//* main react imports 
import React, { useState } from 'react'

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
import AuthLayout from './pages/AuthLayout'
import RegisterPage from './pages/RegisterPage'

export default function App() {
  const { isAuthenticated } = useAuth()
  const PrivateRoute = () => {
    return (
      !isAuthenticated ? <Navigate to="/auth/login" /> : <Outlet />
    )
  }

  //? states to manage navbar search
  // const [searchQuery, setSearchQuery] = useState('');

  return (
    <React.Fragment>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<StudentDashboard />} exact />
          <Route path="/grievance/:grievanceID" element={<GrievanceDetail />} />
          <Route path="/forms" element={<GrievanceForm />} />
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      {isAuthenticated && <ScrollTop />}
      {isAuthenticated && <Footer />}
    </React.Fragment>
  )
}
