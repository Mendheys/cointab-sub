import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'

const Mainroutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>

    </Routes>
  )
}

export default Mainroutes