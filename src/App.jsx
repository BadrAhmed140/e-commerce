import { Children, useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './components/Layout/Layout'
import Register from './components/Register/Register'
import About from './components/About/About'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import NotFound from './components/NotFound/NotFound'
import Card from './components/Card/Card'
import CounterContextProvider from './context/ContextContext'
import UserTokenContextProvider from './context/userTokenContext'
import ProdectedRoutes from './components/prodectedRoutes/prodectedRoutes'
import ProdectedRoutes1 from './components/prodectedRoutes1/prodectedRoutes1'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import  { CartContext } from './context/CartContext'
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';
import { data } from 'autoprefixer';




function App() {
  let   query =new QueryClient();
  let {cardItemsNo,setcardItemsNo,getCard}=useContext(CartContext);
  
  async function getCartInfo(){
    let res = await getCard();
    if(res.data){
    setcardItemsNo(res.data.numOfCartItems);
       }   }
    useEffect(()=>{getCartInfo()},[])
// const x = createBrowserRouter([
// {path:"",element:<LayOut/>,Children:[
//  {index:true,element:<Home/>},
//  {path:"login",element:<Login/>},
//  {path:"register",element:<Register/>},
//  {path:"about",element:<About/>},
//  {path:"card",element:<Card/>},
//  {path:"categories",element:<Categories/>},
//  {path:"brands",element:<Brands/>},
// ]},
// ])
 const x = createBrowserRouter([
   {path:"",element:<LayOut/> ,children:[

     {path:"register",element:<ProdectedRoutes1><Register/></ProdectedRoutes1>},
     {path:"login",element:<ProdectedRoutes1><Login/></ProdectedRoutes1>},
     {path:"home",element: <ProdectedRoutes><Home/></ProdectedRoutes>},
     {path:"card",element:<ProdectedRoutes><Card/></ProdectedRoutes>},
     {path:"brands",element:<ProdectedRoutes><Brands/></ProdectedRoutes>},
     {path:"categories",element:<ProdectedRoutes><Categories/></ProdectedRoutes>},
     {path:"allOrders",element:<ProdectedRoutes><AllOrders/></ProdectedRoutes>},
     {path:"checkOut/:cartId",element:<ProdectedRoutes><CheckOut/></ProdectedRoutes>},
     {path:"productDetails/:id/:categoryId",element:<ProdectedRoutes><ProductDetails/></ProdectedRoutes>},
     {path:"productDetails/:id",element:<ProdectedRoutes><ProductDetails/></ProdectedRoutes>},
     
     {path:"*",element:<NotFound/>},
  
   ]},


   
  

 ])


 const resolvedPath = new URL('relative/path', import.meta.url).pathname;
console.log(resolvedPath);
  const [count, setCount] = useState(0)

  return (
    <>
<QueryClientProvider client={query}>
  <UserTokenContextProvider>
      <CounterContextProvider>
       
      <RouterProvider router={x}>
      </RouterProvider>
    
      <Toaster />
      <ReactQueryDevtools></ReactQueryDevtools>
</CounterContextProvider> 
      </UserTokenContextProvider>
  </QueryClientProvider>

    </>
  )
}

export default App
