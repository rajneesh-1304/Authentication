import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
