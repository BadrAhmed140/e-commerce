import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import Slider from 'react-slick';
export default function Categories() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,  
    arrows: false,
  };
let [count,setCount]=useState(0)
let [categories,setCategories]=useState([]);
useEffect(()=>{
  getCategories();

},[])



function getCategories(){
  axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  .then(res=>{console.log(res)
setCategories(res.data.data);


  })
  .catch(err=>console.log(err))
}

  return (
  <>

<div className="my-8">


<Slider {...settings}>


{

 

  categories.map( category=>
<div key={category._id} className='p-3'>
  <img className='w-full h-[300px]' src={category.image} alt={category.name} />
  <h2>{category.name}</h2>
</div>

  )
}


</Slider>

</div>

  </>
  )
}
