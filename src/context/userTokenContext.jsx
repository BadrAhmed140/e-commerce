import { createContext, useEffect, useState } from "react";

export let UserTokenContext =createContext(null);


export default function UserTokenContextProvider({children}){
    useEffect(()=>{


        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    },[])


    let[token,setToken]=useState(null);


return<UserTokenContext.Provider value={{token,setToken}}>
{children}
</UserTokenContext.Provider>



}

