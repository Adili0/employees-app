import React from 'react'
import Header from './Header'
import '../Admin/home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
 const useNav =useNavigate()
  let handlebtn = (e)=>{
    e.preventDefault()
     useNav('/dashoard')
  }

  let handleEmployee =()=>{
        useNav('/createemp')
  }
  return (
    <>
      <Header/>
      <div className="home-container">
          <button onClick={handlebtn}>
            Dashboard
          </button>
          <button onClick={handleEmployee}>
             Create Employees
          </button>
      </div>
    </>
  )
}

export default Home
