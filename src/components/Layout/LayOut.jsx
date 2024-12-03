import React, { useEffect, useState } from 'react'
import styles from './Layout.module.css'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
export default function LayOut() {

let [count,setCount]=useState(0)

useEffect(()=>{},[])

  return (
<>
    <NavBar/>
    <div className="container mx-auto py-11 ">
    <Outlet/>
    </div>

  <Footer/>
  </>
  )
}
