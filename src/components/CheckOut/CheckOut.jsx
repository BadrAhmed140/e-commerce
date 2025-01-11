import React, { useContext, useEffect, useState } from 'react'
import styles from './CheckOut.module.css'
import { Form, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button, Label, TextInput } from 'flowbite-react'
import { CartContext } from '../../context/CartContext'
export default function CheckOut() {


  let navigate =useNavigate();
let {cartId}=useParams();
let [count,setCount]=useState(0)
let{cashOnDelivery,}=useContext(CartContext)
async function pay(){
  console.log(cartId);
let res = await cashOnDelivery(cartId,myForm.values);

if(res.data.status=="success"){

  navigate('/allOrders');
}else{

  console.log(res);
}

}
useEffect(()=>{},[])
let myForm=useFormik({
  initialValues:{
    details:"",
    phone:"",
    city:"",

},
//validationSchema:validationSchema,
//validate:validateRegister,
onSubmit:pay

})
  return (
<div className="dev">
<h1 className='text-5xl text-green-500 font-bold my-5 text-center'>Checkout now </h1>
    <form   className="flex max-w-3xl flex-col gap-4 m-auto my-6 ">
    <div>
        <div className="mb-2 block">
          <Label htmlFor="details" value="Your details" />
        </div>
        <TextInput id="details" type="text"  onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.details}   />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="phone" value="Your phone" />
        </div>
        <TextInput id="phone" type="tel"  onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.phone}   />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="city" value="Your city" />
        </div>
        <TextInput id="city" type="text"  onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.city}   />
      </div>

      <Button onClick={pay} >
       pay
        </Button>
      </form>

</div>
   
  )
}
