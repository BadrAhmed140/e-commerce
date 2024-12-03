import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'
export default function Footer() {

let [count,setCount]=useState(0)

useEffect(()=>{},[])

  return (
    <div className=' bg-slate-300 p-2 bottom-0  fixed right-0 left-0 text-center'>Footer</div>
  )
}
