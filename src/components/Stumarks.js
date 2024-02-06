"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const subjectList = async (classname) => {
  let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/selectsub/${classname}`);
  resp = await resp.json();
 
  if (resp.success) {
    const subjectarray = resp.msg.subject.map((sub) => {
      return sub.subname;
    })
    return subjectarray;
  } else {
    alert(resp.msg)
  }

}


const Stumarks = ({ _id }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    fatherName: '',
    rollNumber: '',
    class: '',
    activeExam: 'pa1',
    exams: {
      pa1: [],
      pa2: [],
      pa3: [],
      halfYearly: [],
      annual: [],
    },
    totalMarks: 0,
  });
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const stuData = async () => {
      let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addmarks/${_id}`);
      resp = await resp.json();
      //memory location ka reference share karne ki bajay actual data copy karne ke liye deep copy
      // const respDeepcpy = JSON.parse(JSON.stringify(resp));
      //yaha resp.msg.exams me api se mile deta me pa1, pa2... all subject kaise aa raha hai? jbaki route.js me console.log m balnk h (database se)
      //   formData.class= resp.msg.class;
      const allSubjects = await subjectList(resp.msg.class);
      if(allSubjects){
        setSubjects(allSubjects)
      }
      
      if(resp.success){
        Object.keys(resp.msg?.exams).map((examType) => {
          if (resp.msg.exams[examType].length === 0 || resp.msg.exams[examType].length !== subjects.length) {
            resp.msg.exams[examType] = allSubjects?.map((subject) => {
              const marksSubObj = resp.msg.exams[examType].find((scoreObj) => {
                return scoreObj.subject === subject
              });
              const marks = marksSubObj?.score
              return { subject, score: marks ? marks : null || null }
            })
          }
        })
  
        setFormData({ ...resp.msg, activeExam: 'pa1' })
      }

      
    }
    stuData();
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleExamChange = (subject, score) => {
    const updatedExams = { ...formData.exams };
    const updatedSubjects = updatedExams[formData.activeExam].map((item) =>
      item.subject === subject ? { ...item, score: parseInt(score, 10) || null } : item
    );
    updatedExams[formData.activeExam] = updatedSubjects;
    setFormData({
      ...formData,
      exams: updatedExams,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { activeExam, ...newformData } = formData;
    
    let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addmarks/${_id}`, {
      method: "PUT",
      body: JSON.stringify(newformData)
    });
    resp = await resp.json();
    if (resp.success) {
      alert(resp.msg);
      router.push(`/teacherslogin/${formData.class}`)
    } else {
      alert("some error")
    }
  };


  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 p-4 bg-gray-100">
        {/* ... (Basic information fields) */}
         {/* ... other form fields ... */}
         <div className="mb-4">
          <label className="block text-sm font-bold text-gray-600">Student Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        {/* ... other form fields ... */}

        <div className="mb-4">
          <label className="block text-sm font-bold  text-gray-600">Roll Number:</label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-600">
            Fathers Name:
            <input
              className="mt-1 p-2 border rounded-md w-full"
              type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
          </label>

        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-600">
            Class:
            <input
              className="mt-1 p-2 border rounded-md w-full"
              type="text" name="class" value={formData.class} onChange={handleChange} required />
          </label>
        </div>

{/* marks entry fields */}

        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">Active Exam:</label>
          <select
            name="activeExam"
            value={formData.activeExam}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          >
            {Object.keys(formData.exams).map((exam) => (
              <option key={exam} value={exam}>
                {exam.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Render input fields for the active exam */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">{formData.activeExam.toUpperCase()}</h3>
          {formData.exams[formData.activeExam]?.map((subjectData, index) => (
            <div key={index} className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1">
                {subjectData.subject}:
              </label>
              <input
                type="number"
                value={subjectData.score || ''}
                onChange={(e) => handleExamChange(subjectData.subject, e.target.value)}
                className="border rounded w-full py-2 px-3"
              />
            </div>
          ))}
        </div>

        {/* Add a submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>

      </form>
      <button
        onClick={() => router.push(`/teacherslogin`)}
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mx-4"
      >
        Back
      </button>
    </div>
  );
};

export default Stumarks;
