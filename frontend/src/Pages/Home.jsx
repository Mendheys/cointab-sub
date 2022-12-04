import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const token = JSON.parse(localStorage.getItem("cointab-token"))
    const nav = useNavigate()

    // console.log(token)
    const handleLogout = () => {
        // setToken(false)
        nav("/")
    }
    

    
  return (
    <div>
        <h1>{token.token?`Hello ${token.user.email}` : ""}</h1>
        <br /><br />
        <button onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

export default Home