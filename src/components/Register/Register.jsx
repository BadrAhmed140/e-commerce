import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { Alert, Button, Label, TextInput } from 'flowbite-react'
import { useFormik } from 'formik'
import { HiInformationCircle } from "react-icons/hi";
import axios from 'axios'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
export default function Register() {

let [count,setCount]=useState(0)
useEffect(()=>{},[])

let [apiError,setApiError]=useState(null);
let [isLoading,setIsLoading]=useState(false);
let navigate=useNavigate();





const validationSchema=()=>{

  return Yup.object(
{
  name:Yup.string().min(3,'Must be 3 characters or more').max(15, 'Must be 15 characters or less').required('Required').matches(/^[A-Z][a-z]/,'Name must start with capital letter'),
  email:Yup.string().email('Invaild Email').required('required'),
  password:Yup.string().matches(/(?=.*[A-Z])(?=.*[!@#\$%])/,'Invaild Password').required('Required'),
  rePassword:Yup.string().oneOf([Yup.ref('password')]).required('required'),
  phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'Invaild Phone').required('required')
}
  );
}

function validateRegister(values){
  const errors ={}
  if (!values.name){
    errors.name = "Required"
    
  }else if (!/^[A-Z][a-z]{3,10}$/.test(values.name)){
    errors.name="Name must start with capital letter"
  }


  if (!values.email){
    errors.email = "Required"
    
  }else if (!/^(?!.*\.{2})(?!\.)[a-z0-9_.'-]*[a-z0-9_'-]@(?!_)(?:[a-z0-9_'-]+\.)+[a-z0-9_'-]{2,}$/.test(values.email)){
    errors.email="Invalid Email"
  }
  


  if (!values.password){
    errors.password = "Required"
    
  }else if (!/^[A-Z][a-z0-9]{3,5}$/.test(values.password)){
    errors.password="Invalid password"
  }


  if (!values.rePassword){
    errors.rePassword = "Required"
    
  }else if (values.password !=values.rePassword){
    errors.password="repassword must match password"
  }




  if (!values.phone){
    errors.phone = "Required"
    
  }else if (!/^01[0125][0-9]{8}$/.test(values.phone)){
    errors.phone="Invalid phone"
  }


  return errors;
}

async function register(formValue){
setApiError(null);
setIsLoading(true)

  await  axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",formValue)
  .then((res)=>{
    let {data} = res;
    if(data.message =="success"){
 navigate('/login')
 
  }else{
    
  }}
).catch((err)=>{
    setApiError(err.response.data.message);
    console.log(apiError);
    setIsLoading(false);
  })

 
 
  console.log(data);
}

let myForm=useFormik({initialValues:{
  name:"",
  email:"",
  password:"",
  rePassword:"",
  phone:"",
},
validationSchema:validationSchema,
//validate:validateRegister,
onSubmit:register

})

  return (
   <>

   {apiError&&<div className='flex max-w-md flex-col gap-4 m-auto my-6'><Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">{apiError}</span>
    </Alert></div>}
<form onSubmit={myForm.handleSubmit} className="flex max-w-md flex-col gap-4 m-auto my-6 ">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your name" />
        </div>
        <TextInput id="name" type="name"  onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.name}   />
      </div>
      {myForm.errors.name && myForm.touched.name ?<Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">{myForm.errors.name}</span>
    </Alert>:null}
      
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput id="email" type="email" onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.email}  />
      </div>
      {myForm.errors.email&&myForm.touched.email?<Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">{myForm.errors.email}!</span>
    </Alert>:null}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput id="password" type="password" onBlur={myForm.handleBlur}  onChange={myForm.handleChange} value={myForm.values.password} />
      </div>

      {myForm.errors.password&&myForm.touched.password?<Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">{myForm.errors.password}!</span>
    </Alert>:null}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="rePassword" value="rePassword" />
        </div>
        <TextInput id="rePassword" type="password" onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.rePassword} />
      </div>
      {myForm.errors.rePassword&&myForm.touched.rePassword?<Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">{myForm.errors.rePassword}!</span>
    </Alert>:null}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="phone" value="Your phone" />
        </div>
        <TextInput id="phone" type="tel" onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.phone} />
      </div>
      {myForm.errors.phone&&myForm.touched.phone?<Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">{myForm.errors.phone}!</span>
    </Alert>:null}
      <Button type="submit" disabled={isLoading} >
        
        {isLoading? <i class="fa-solid fa-spinner"></i>:"Submit"}
        </Button>
    </form>
    </>

  )
}
