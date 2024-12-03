import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ClipLoader, MoonLoader } from 'react-spinners'
import { data } from 'autoprefixer'
import ProductItem from '../ProductItem/ProductItem'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'


export default function ProductDetails() {
  let [itemLoading,setItemLoading]=useState(false);
  let {addProductToCard} =useContext(CartContext);
  let {id}=useParams()
  let {categoryId}=useParams()

let [products ,setProducts] =useState([])
let [RelatedProducts ,setRelatedProducts] =useState([])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,  
    arrows: false,
  };


  let {isLoading,data,isError} =useQuery({
    
    queryKey:['details',id],
    queryFn:getProducts,
   gcTime :3000,
    select:(data)=>data?.data.data,

  })

 
  async function addToCard(id_prod){
    setItemLoading(true);
    console.log('iiiii', itemLoading);
    let data =await addProductToCard(id_prod);
  
    if(data?.data?.status=="success"){
      toast.success(data.data.message);
    }else{
      toast.error(data.response.data.message);

    }

    setItemLoading(false);
  }


  function getRelatedProducts(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   .then(({data})=>{
     console.log(categoryId);
     console.log(categoryId);
 
 let res =data.data.filter( ele=>ele.category._id==categoryId && id!=ele.id);
 setRelatedProducts(res);
 console.log("related is",res);
   })
   .catch(err=>console.log(err))
 }


 function getProducts(){
  return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  
  }

  useEffect(()=>{
    setProducts(data);
   },[data])





useEffect(()=>{
  getProducts()
  getRelatedProducts()
},[id])








//'{{BaseUrl}}/api/v1/products/6428de2adc1175abc65ca05b'
// function getProducts(){
//   axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
//    .then(res=>{console.log(res)
   
// setIsLoading(false);
     
//      setProducts(res.data.data);
//    })
//    .catch(err=>console.log(err))
//  }



  return (
<>
<div className="row  mt-10 items-center mx-auto"> 

{isLoading ?<div className="flex w-full justify-center">
<ClipLoader/>
</div>:<>
<div className="w-1/4 mr-4 ">
<Slider {...settings}>
{products?.images.map(src=>(<img className='w-full' src={src}/>))}
    </Slider>

  
  </div>
<div className="w-2/4 content-center">
<h2 className='text-4xl font-bold '>{products?.title}</h2>
<p className='mb-5 text-gray-500 font-light'> {products?.description}</p>
<span className='block mb-2'>{products?.category.name}</span>
<div className='flex justify-between '>
<span className='font-bold text-gray-500'>{products?.price} EGP</span>
<span>{products?.ratingsAverage} <i class="fa-solid fa-star text-yellow-300"></i></span>

</div>
<button className='btn' onClick={()=>addToCard(products?.id)}>Add to Card</button>

</div>
</>
}
</div>

<h2 className='text-green-500 text-3xl font-bold mt-10'>Related Products</h2>

<div className="row">
  
  {RelatedProducts.map(product=><ProductItem product={product} loading={itemLoading} addCard={addToCard}/>)}
</div>



</>

  )
}
