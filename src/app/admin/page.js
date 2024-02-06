"use client"

// pages/admin.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';




export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const router= useRouter();
  const [admin, setAdmin]= useState({
    user:"",
    password:""
  })
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const submit= async()=>{
    let resp= await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin`,{
      method:"POST",
      body: JSON.stringify(admin)
    })

    resp= await resp.json();
   
    alert(resp.msg)
    setAdmin({
    user:"",
    password:""
  })

  router.push("/admin/admpage")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
       <button
       onClick={()=>router.push("/")}
        className="absolute top-8 right-8 text-blue-500 hover:underline focus:outline-none font-semibold">
        HOME
      </button>
      <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full text-center">
        <h3 className="text-2xl font-bold mb-4">Admin Login</h3>
        <label htmlFor="admin" className="block text-sm font-medium text-gray-600 mb-2">
          User:
        </label>
        <input
          type="text"
          id="admin"
          value={admin.user}
          className="p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 mb-4"
          onChange={(e)=>setAdmin({...admin, user:e.target.value})}
          autoComplete="off"
        />
        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
          Password:
        </label>
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={admin.password}
            className="p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e)=>setAdmin({...admin, password:e.target.value})}
            autoComplete="off"
          />
          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <span className="text-gray-500">Hide</span>
            ) : (
              <span className="text-gray-500">Show</span>
            )}
          </span>
        </div>
        <input
          type="button"
          value="Submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={submit}
        />
      </div>
    </div>
  );
}