"use client"

import * as React from "react"
import { useTheme } from "next-themes"




export function ModeToggle() {
  const { setTheme } = useTheme()
  const [modes,setModes]= React.useState(true)
React.useEffect(()=> {
     if (modes == true) {
           setTheme('light')
  }else setTheme('dark')
},[modes])
 
console.log(modes)
  return (
   
     
    
        <button onClick={() =>{setModes(!modes) } }>
          Dark
        </button>
     
  )
}
