import React, { useEffect, useState } from 'react'
import styles from './MainSlider.module.css'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import Slider from 'react-slick'
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,  
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10000,
  };
let [count,setCount]=useState(0)

useEffect(()=>{},[])

  return (
   <div className="row my-3">
<div className="w-3/4">
<Slider{...settings}>
<img src={slider1} alt="" className='h-[600px]'/>
<img src={slider2} alt="" className='h-[600px]'/>
<img src={slider3} alt="" className='h-[600px]'/>

</Slider>
</div>

<div className="w-1/4">

<img src={slider2} alt="" className='h-[300px]'/>
<img src={slider3} alt="" className='h-[300px]'/>
</div>
   </div>
  )
}
