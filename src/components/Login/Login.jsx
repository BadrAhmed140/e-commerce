import React, { useContext, useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Button, Checkbox, Label, TextInput,Alert } from 'flowbite-react'
import { HiInformationCircle } from "react-icons/hi";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from 'axios';
import  { UserTokenContext } from '../../context/userTokenContext';
export default function Login() {

let [count,setCount]=useState(0)

useEffect(()=>{},[])



let [apiError,setApiError]=useState(null);
let [isLoading,setIsLoading]=useState(false);
let navigate=useNavigate();

let tokenContext=useContext(UserTokenContext)



const validationSchema=()=>{

  return Yup.object(
{
  email:Yup.string().email('Invaild Email').required('required'),
  password:Yup.string().matches(/(?=.*[A-Z])(?=.*[!@#\$%])/,'Invaild Password').required('Required'),
 
}
  );
}


async function login(formValue){
  setApiError(null);
  setIsLoading(true)
  
    await  axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",formValue)
    .then((res)=>{
      let {data} = res;
      console.log(data);
      if(data.message =="success"){
   
   localStorage.setItem("token",data.token);
tokenContext.setToken(data.token)


        navigate('/home')


   
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
   
    email:"",
    password:"",
  
  },  
  validationSchema:validationSchema,
  //validate:validateRegister,
  onSubmit:login
  
  })
  
    return (
     <>
  
     {apiError&&<div className='flex max-w-md flex-col gap-4 m-auto my-6'><Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">{apiError}</span>
      </Alert></div>}
  <form onSubmit={myForm.handleSubmit} className="flex max-w-md flex-col gap-4 m-auto my-6 ">
       
        
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
       
        <Button type="submit" disabled={isLoading} >
          
          {isLoading? <i className="fa-solid fa-spinner"></i>:"Submit"}
          </Button>
      </form>
      </>)
  
}
