import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginForm'
import { ProductPage } from './pages/ProductList'
import { NotFound } from './pages/NotFound'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='*' element={<NotFound/>}/>

        <Route element={<ProtectedRoute/>}>
            <Route path='/' element={<ProductPage/>}/>
        </Route>
    </Routes>
  )
}
