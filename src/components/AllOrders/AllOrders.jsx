import React, { useEffect, useState,useContext } from 'react'
import styles from './AllOrders.module.css'

import { CartContext } from '../../context/CartContext';
import { UserTokenContext } from '../../context/userTokenContext';



export default function AllOrders() {

let [count,setCount]=useState(0)
let {userId}=useContext(UserTokenContext);
let {getAllOrder}=useContext(CartContext);



async function getOrders(){
  setTimeout(async()=>{  let res =await getAllOrder(userId);
    console.log(res);},10)

}
useEffect(()=>{ if (userId) {
  getOrders();
}},[userId])

  return (
    <div>AllOrders</div>
  )
}
