import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProducts.module.css'

import axios from 'axios'
import ProductItem from '../ProductItem/ProductItem'
import { useQuery } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
export default function RecentProducts() {
//state
let [itemLoading,setItemLoading]=useState(false);
let [currentId,setCurrentId]=useState(null)
let {addProductToCard,cardItemsNo,setcardItemsNo} =useContext( CartContext);

let [items,setItems]=useState([]);


// let [count,setCount]=useState(0)
// let [products ,setProducts] =useState([])



// useEffect(()=>{getProducts()},[])
//  function getProducts(){
//    axios.get('https://ecommerce.routemisr.com/api/v1/products')
//     .then(res=>{console.log(res)
    

      
//       setProducts(res.data.data);
//     })
//     .catch(err=>console.log(err))
//   }

function getProducts(){
return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}

let {isLoading,data,isError} =useQuery({
  queryKey:['products'],
  queryFn:getProducts
})


async function addToCard(id) {
  setItemLoading(true);

  // Create a copy of the items array
  let updatedItems = [...items];

  // Update the local copy of items
  updatedItems[id] = true;

  // Update the state with the updated items array
  setItems(updatedItems);

  // Call the asynchronous function
  try {
    let data = await addProductToCard(id);

    if (data?.data?.status === "success") {
      let newcardItemsNo=cardItemsNo+1;
      setcardItemsNo(newcardItemsNo);
      toast.success(data.data.message);
     
    } else {
      toast.error(data.response.data.message);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    toast.error("An error occurred while adding the product to the cart.");
  }

  setItemLoading(false);}


if(isLoading){
  return <div className="flex w-full justify-center">
  <ClipLoader/>
  </div>
}


if(isError){
  return <div className="flex w-full justify-center">
  <ClipLoader/>
  </div>
}
  return (
<>
<div className='row' >

{data?.data.data.map(product=><ProductItem key={product.id} product={product} itemLoading={itemLoading}  items={items} addCard={addToCard}/>)} 

</div>

</>
  )
}
