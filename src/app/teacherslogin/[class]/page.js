"use client"

import Link from 'next/link';
import Markstable from '@/components/Markstable';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Page({ params }) {
  const [studentData, setStudentData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const router = useRouter();
  useEffect(() => {
    // fetch student detail
    const getData = async () => {
      let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/student/${params.class}`);
      resp = await resp.json();
      setStudentData(resp.msg)
    }
    getData();

  }, [params.class])

  useEffect(() => {
    // fetch subject list
    const subjectList = async (classname) => {
      let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/selectsub/${classname}`);
      resp = await resp.json();
      
      if (resp.success) {
        const subjectarray = resp.msg.subject.map((sub) => {
          return sub.subname;
        })
       
        setSubjects(subjectarray);
      } else {
        alert(resp.msg)
      }
    }

    subjectList(params.class)
  }, [params.class])
 

  return (
    <div className="container mx-auto mt-8 p-4">
      <button
        type="button"
        onClick={() => router.push("/")}
        className="text-blue-500 hover:underline focus:outline-none absolute top-8 right-8 font-semibold"
      >
        HOME
      </button>
      {/* Class 12 Dashboard title */}
      <h1 className="text-4xl font-bold mb-4 lg:text-center">{params.class} Dashboard</h1>

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

          {studentData?.map((student) => (
            <div key={student._id}>
              <Markstable stuData={student} subjects={subjects} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}