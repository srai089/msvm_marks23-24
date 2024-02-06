"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




export default function Page() {
const [allteachers, setAllteachers]= useState([])
const router= useRouter()
  
  
 useEffect(()=>{
  const teachersList = async ()=>{
    let data= await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/teacherreg`);
    data= await data.json();
   setAllteachers(data.msg)
  };
   teachersList();
 }, [])
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
       <button
       onClick={()=>router.push("/")}
        className="absolute top-8 right-8 text-blue-500 hover:underline focus:outline-none font-semibold">
        HOME
      </button>
      {/* New teacher registration button */}
      <div className="mb-12 mt-20">
        <Link href="/regteachers">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md ">
            New Teacher Registration
          </button>
        </Link>
      </div>
      {/* Registered Teachers Table */}
      <div className="w-full mx-4 p-4 bg-white rounded-md shadow-lg overflow-x-auto">
        <h4 className="text-2xl font-semibold mb-4">Registered Teachers</h4>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Class</th>
              <th className="py-2 px-4 border">Class Teacher Name</th>
              <th className="py-2 px-4 border">User ID</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allteachers.map((teacher, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{teacher.className}</td>
                <td className="py-2 px-4 border">{teacher.classTeacherName}</td>
                <td className="py-2 px-4 border">{teacher.userId}</td>
                <td className="py-2 px-4 border">
                  <Link href={`./admpage/${teacher._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md">
                      Edit/Update
                    </button>
                  </Link>       
                </td>
                <td className="py-2 px-4 border">
                <Link href={`./chngpsw/${teacher._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md">
                      Change Password
                    </button>
                  </Link>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Go to Home Page button */}
      <div className="mt-12">
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Go to Home Page
          </button>
        </Link>
      </div>
    </div>
  );
}



