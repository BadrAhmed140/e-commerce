import axios from "axios";
import { createContext, useState } from "react";


export let CartContext =createContext();
const headers={
    token:window.localStorage.getItem('token')
}


//check out 
function cashOnDelivery(url,shippingAddress){
    return axios.post(url,
        {shippingAddress},
        {headers}
    ).then(res=>res)
    .catch(err=>err)
}
// add to card
function addProductToCard(productId){
    
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {productId},
        {headers}
    ).then(res=>res)
    .catch(err=>err)
}

//get to card
function getCard(){
   
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
       
        {headers}
    ).then(res=>res)
    .catch(err=>err)
}

//remove from card
function removeItemFromCard(id){
   
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
       
        {headers}
    ).then(res=>res)
    .catch(err=>err)
}



//update from card
function updateItemFromCard(id,count){
   
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {count},
        {headers},
    ).then(res=>res)
    .catch(err=>err)
}
export default function CartContextProvider({children}){

let [cartId,setCartId]=useState(null);

return <CartContext.Provider  value={{cartId,setCartId,addProductToCard ,getCard,removeItemFromCard,updateItemFromCard,cashOnDelivery}}>


{children}

</CartContext.Provider>


}