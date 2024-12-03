import { createContext, useState } from "react";


export let CounterContext =createContext(0)




export default function CounterContextProvider({children}){

let[counter,setCounter]= useState(10);


return <CounterContext.Provider  value={{counter}}>


{children}

</CounterContext.Provider>


}