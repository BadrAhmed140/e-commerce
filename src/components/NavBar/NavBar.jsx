import React, { useContext, useEffect, useState } from 'react'
import styles from './NavBar.module.css'
import logo from '../../assets/images/logo.jpeg'
import { NavLink, useNavigate} from 'react-router-dom'
import { UserTokenContext   } from '../../context/userTokenContext'
import {CartContext} from '../../context/CartContext'
export default function NavBar() {
let [count,setCount]=useState(0)
let userToken=useContext(UserTokenContext)
let {cardItemsNo,setcardItemsNo}=useContext(CartContext)
let navigate =useNavigate();





useEffect(()=>{},[])



function signOut(){
  userToken.setToken(null);
  localStorage.removeItem("token");
navigate("/login")

}
  return (
    <nav className=' bg-slate-300 p-2 lg:fixed right-0 left-0 top-0 z-40'>
      <div className=' mx-auto flex flex-col lg:flex-row justify-between items-center container '>
<div className='text-center left-side flex  flex-col lg:flex-row'>
  <img className='mr-5 lg:mb-0 mb-4' width={120} src={logo} alt="fresh-cart " />
{userToken.token ?<ul className='flex flex-col lg:flex-row gap-2 items-center lg:mb-0 mb-2'>

    
<li>
  <NavLink to={'home'}>Home</NavLink>
</li>
<li>
  <NavLink to={'card'}>Card</NavLink>
</li>

<li>
  <NavLink to={'brands'}>Brands</NavLink>
</li>
<li>
  <NavLink to={'categories'}>Categories</NavLink>
</li>
</ul >:
null}
  
</div>
<div className='left-side flex  flex-col lg:flex-row'>
<ul className='flex flex-col lg:flex-row gap-2 items-center'>
<li>
  <i className="fa-brands mx-1  fa-facebook"></i>
  <i className="fa-brands mx-1  fa-instagram"></i>
  <i className="fa-brands mx-1  fa-twitter"></i>
  </li>
  <li className="relative mx-10 py-5">
    <div className="absolute bg-green-800 p-1 text-white top-0 rounded-xl">{cardItemsNo}</div>
  <i className="fa-solid fa-cart-shopping text-green-700 text-3xl" />

  </li>
 
  {userToken.token?  
  <li>
  <button to={''}  onClick={signOut}>Sign Out</button>
</li>

  :<>
  

  <li>
    <NavLink to={'register'}>Register</NavLink>
  </li>

  <li>
    <NavLink to={'login'}>Login</NavLink>
  </li>
  </>}
  
  
  

</ul>
</div>
      </div>
    </nav>
  )
}
