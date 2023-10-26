import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../store/slices/sliceUser'
import { type RootState } from '../store/store'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  if (localStorage.getItem('token') != null) {
    dispatch(setLogin(true))
  }
  const isLoggedIn = useSelector((state: RootState) => (state.userData.authorized))

  console.log(isLoggedIn)
  return (
    isLoggedIn ? <Outlet /> : <Navigate to={{ pathname: 'login' }} replace />
  )
}
