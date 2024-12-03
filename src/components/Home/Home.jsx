import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import Categories from '../Categories/Categories'
import MainSlider from '../MainSlider/MainSlider'



export default function Home() {




  return (

    <>
<MainSlider/>
<Categories/>
<RecentProducts/>
    
    </>
  )
}
