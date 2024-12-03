import React, { useEffect, useState } from 'react'
import styles from './ProdectedRoutes1.module.css'
import { Navigate } from 'react-router-dom'
export default function ProdectedRoutes1({children}) {

let [count,setCount]=useState(0)

useEffect(()=>{},[])
if(localStorage.getItem("token")){
  return <Navigate  to={"/home"}/>
  
  }else
  {
    return children
  }
    
  }
  