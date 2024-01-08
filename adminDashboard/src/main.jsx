import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Login from './components/Pages/Login.jsx'
import Home from './components/Pages/Home.jsx'
import Users from './components/Pages/Users.jsx'
import Protected from './components//Protected.jsx'
import ManageAPI from './components/Pages/ManageAPI.jsx'
import Profile from './components/Pages/Profile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Protected />}>
        <Route path='/' element={<Home />}/>
        <Route path='/manage-users' element={<Users />}/>
        <Route path='/manage-api' element={<ManageAPI />}/>
        <Route path='/profile' element={<Profile />}/>
      </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router} />
);
