import React, { useEffect, useState } from 'react'
import styles from './ProductItem.module.css'
import { Link } from 'react-router-dom'
export default function   ProductItem({product,addCard,itemLoading ,items}) {







useEffect(()=>{},[])

  return (
<>

  <div key={product.id} className='w-1/6  p-1 '>
<div  className='product hover:rounded-md overflow-hidden' >
<div className="p-2">
  <Link to={`/productDetails/${product.id}/${product.category._id}`}>
<img src={product.imageCover } className='w-full'/>
  <span className='text-green-500'>{product.category?.name}</span>
  <h2 className='font-extrabold mb-3'>{product.title.split(" ").splice(0,2).join(" ")}</h2>
<div className='flex justify-between'>
<span className='font-bold text-gray-500'>{product.price} EGP</span>
<span>{product.ratingsAverage} <i className="fa-solid fa-star text-yellow-300"></i></span>

</div>
</Link>
<button className='btn' onClick={()=>{addCard(product.id); /*changeItems(product.id)  setCurrentId(product.id)*/}}>
  {
  
  itemLoading && items[product.id] ?<i className="fa-solid fa-spinner"></i>: <span> Add to Card</span>}
  
 </button>
</div>
  </div>
  </div>


</>
  )
}
