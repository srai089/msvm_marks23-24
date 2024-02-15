"use client"

import Link from 'next/link';
import Markstable from '@/components/Markstable';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spiner from '@/components/Spiner';
import Logout from "@/components/Logout";



export default function Page({ params }) {
  const [studentData, setStudentData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg]= useState(false);
  const router = useRouter();

  useEffect(() => {
    // fetch student detail
    const getData = async () => {
      setIsLoading(true);
      let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/student/${params.class}`);
      resp = await resp.json();
      setStudentData(resp.msg);
    }
    // setTimeout(getData, 5000)
    getData();

  }, [params.class, msg])

  useEffect(() => {
    // fetch subject list
    const subjectList = async (classname) => {
      setIsLoading(true)
      let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/selectsub/${classname}`);
      resp = await resp.json();
      if (resp.success) {
       
        setSubjects(resp.msg.subject);
      } else {
        alert(resp.msg)
      }
    }

    subjectList(params.class)
  }, [params.class])

  function handleMsg (){
    setMsg(!msg);
    alert("Student data deleted successfully");
  }

 

  return (
    <div className="container mx-auto mt-8 p-4 overflow-auto">

      {/* Class 12 Dashboard title */}
      <h1 className="text-4xl font-bold mb-4 lg:text-center">{params.class} Dashboard</h1>
      <div className=' absolute top-24 right-2'>
        <Logout auth="authTeacher"/>
      </div>

      <div className="lg:flex">
        {/* Left side column for buttons */}
        <div className="lg:w-1/4 mb-4 lg:mr-4">

          <Link href={`/studentreg/${params.class}`} >
            <button className="bg-blue-500 text-white p-2 rounded mb-2 w-full" >
              Register Student
            </button>
          </Link>


          <button className="bg-green-500 text-white p-2 rounded mb-2 w-full"
            onClick={() => router.push(`/selectsub/${params.class}`)}
          >
            Select Subjects and Max Marks
          </button>
          <button className="bg-yellow-500 text-white p-2 rounded w-full"
            onClick={() => router.push(`/genratemarksheet/${params.class}`)}
          >
            Generate Marksheet
          </button>
         
        </div>

        {/* Center content */}
        <div className="lg:w-3/4">
          {/* Table to display student details */}
          <div>
            <p className='text-red-600'>कृपया स्‍टूडेंटस् का रजिष्‍ट्रेशन करने से पूर्व सभी विषयों और सम्‍पूर्ण योग को ध्‍यानपूर्वक भर लें।</p>
          </div>

          {!isLoading && <Spiner className="flex justify-center align-middle" />}



          {studentData?.map((student) => (
            <div key={student._id}>
              <Markstable stuData={student} subjects={subjects} msgData= {handleMsg}/>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}