import React, { useContext, useEffect, useState } from 'react'
import styles from './Card.module.css'

import { CounterContext } from '../../context/ContextContext'
import { CartContext } from '../../context/CartContext'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'



export default function Card() {
let {getCard,removeItemFromCard,updateItemFromCard,setCartId,cartId}=useContext(CartContext)

let [cart,setCart]=useState(null);
let [loading,setLoading]=useState(true);
let [loadingRemove,setLoadingRemove]=useState(false);
let [items,setItems]=useState([]);
let navigate =useNavigate();



async function getCartInfo(){
setLoading(true);
let res = await getCard();
console.log(res);
setCartId(res.data.cartId);
setCart(res.data);
setLoading(false);
}

function navigateToCheckout(){
  navigate(`/checkOut/${cartId}`);

}

async function removeItem(id){
  setLoadingRemove(true);
  
  // Create a copy of the items array
  let updatedItems = [...items];

  // Update the local copy of items
  updatedItems[id] = true;

  // Update the state with the updated items array
  setItems(updatedItems);

  let res = await removeItemFromCard(id);
  console.log(res);
  setLoadingRemove(false);
  setCart(res.data);
  
  }

  async function updateItem(id,count){
   
    let res = await updateItemFromCard(id,count);
 
    setCart(res.data);
    
    }


useEffect(()=>{getCartInfo()},[])
let x =useContext(CounterContext);

console.log(x)
  return (
  <>

{loading ?  <div className="flex w-full justify-center">
  <ClipLoader/>
  </div>: <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <h1 className='text-5xl text-green-500 font-bold my-5 text-center'>Shipping Cart</h1>
  <div className="flex justify-between my-6 px-7  ">
    <h2 className='text-2xl text-green-500'>Total Cart Item : {cart.numOfCartItems} </h2>
    <h2 className='text-2xl text-green-500'>Total Price : {cart.data.totalCartPrice} </h2>
  </div>
  <table className="w-full mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {cart.data.products.map(product=>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateItem(product.product._id,product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" >
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
<span>{product.count}</span>
            </div>
            <button onClick={()=>updateItem(product.product._id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price}
        </td>
        <td className="px-6 py-4">
          {loadingRemove&& items[product.product._id]?<div className="flex w-full justify-center">
  <ClipLoader/>
  </div>:          <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=>removeItem(product.product._id)}>Remove</button>
}
        </td>
      </tr>)}
    
    
    </tbody>

  </table>
  <button className='btn '  onClick={()=>{navigateToCheckout()}}>Check Out</button>
</div>
}

  </>
  )
}
