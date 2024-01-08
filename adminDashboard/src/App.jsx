import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'

const App = () => {
  return (
    <div className=''>
      <Outlet/>
    </div>
  )
}

export default App