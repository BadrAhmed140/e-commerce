import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { decode } from "jsonwebtoken";
export let UserTokenContext =createContext(null);



function decodeToken(){
   return  jwtDecode(json.stringify(localStorage.getItem("item")));
}
export default function UserTokenContextProvider({children}){




    useEffect(()=>{


        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            console.log(decodeToken());
            userId=decodeToken.id;
        }
    },[])
    let[token,setToken]=useState(null);
    let[userId,setUserId]=useState(null);
return<UserTokenContext.Provider value={{token,setToken}}>
{children}
</UserTokenContext.Provider>
}

