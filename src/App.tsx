import React from 'react'
import { AppRoutes } from './routes'

export const App: React.FC = () => {
  return (
    <div className="App" style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
      <AppRoutes/>
    </div>
  )
}
