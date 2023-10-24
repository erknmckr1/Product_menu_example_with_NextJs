import React from 'react'
import {BsSearch} from 'react-icons/bs'
import { useState } from 'react'
function Header(props) {
    const {setSearchText} = props;
    const [openInput,setOpenInput] = useState(false)
  return (
    <div className="h-[100px] w-full px-2 sm:p-0 bg-gray-300 flex justify-between ">
    <div className="sm:w-2/3 h-full flex justify-center items-center">
      <span className="text-[30px]">LOGO</span>
    </div>
    <div className="sm:w-1/3 h-full flex justify-center items-center">
      <input onChange={(e)=>setSearchText(e.target.value)} placeholder="Arama" className={`${openInput === false ? "text-center hidden sm:block outline-none bg-transparent border-b-4 border-black" : "text-center sm:block outline-none bg-transparent border-b-4 border-black"} `}/>
      <button onClick={()=>setOpenInput(!openInput)} className="block sm:hidden">
        <BsSearch/>
      </button>
    </div>
  </div>
  )
}

export default Header
