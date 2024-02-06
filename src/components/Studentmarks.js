"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import axios from 'axios'; // Make sure to install axios if not already done (npm install axios)


const Studentmarks = ({ _id }) => {
  const router= useRouter();
 
  const [formData, setFormData] = useState({
    firstName: '',
    fatherName: '',
    rollNumber: '',
    class: '',
    exams: {
      pa1: [],
      pa2: [],
      pa3: [],
      halfYearly: [],
      annual: [],
    },
    totalMarks: 0,
  });

  useEffect(() => {
    const stuData = async () => {
      let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addmarks/${_id}`);
      resp = await  resp.json();
      formData.class= resp.msg.class
      setFormData(resp.msg)
    }
    stuData();
  }, [])

  // Track which exam type's input fields should be shown
  const [activeExamType, setActiveExamType] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExamChange = (examType, subjectIndex, field, value) => {
    setFormData((prevData) => {
      const updatedExams = { ...prevData.exams };
      updatedExams[examType][subjectIndex][field] = value;
      return { ...prevData, exams: updatedExams };
    });
  };

  const handleAddExam = (examType) => {
    setFormData((prevData) => {
      const updatedExams = { ...prevData.exams };
      updatedExams[examType].push({ subject: '', score: null });
      return { ...prevData, exams: updatedExams };
    });
  };

  const handleRemoveExam = (examType, subjectIndex) => {
    setFormData((prevData) => {
      const updatedExams = { ...prevData.exams };
      updatedExams[examType].splice(subjectIndex, 1);
      return { ...prevData, exams: updatedExams };
    });
  };

  const handleSetActiveExamType = (examType) => {
    setActiveExamType(examType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addmarks/${_id}`,{
      method:"PUT",
      body:JSON.stringify(formData)
    });
    resp= await resp.json();
    if(resp.success){
      alert (resp.msg);
      router.push(`/teacherslogin/${formData.class}`)
    }else{
      alert("some error")
    }
   
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Student Information Form</h2>

      <form onSubmit={handleSubmit}>
        {/* ... other form fields ... */}
        {/* ... other form fields ... */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">First Name:</label>
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
          <label className="block text-sm font-medium text-gray-600">Roll Number:</label>
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
          <label className="block text-sm font-medium text-gray-600">
            Fathers Name:
            <input
              className="mt-1 p-2 border rounded-md w-full"
              type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
          </label>

        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Class:
            <input
              className="mt-1 p-2 border rounded-md w-full"
              type="text" name="class" value={formData.class} onChange={handleChange} required />
          </label>
        </div>

        {/* Render exam score fields dynamically based on schema */}
        {Object.keys(formData.exams).map((examType) => (
          <div key={examType} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{examType}</h3>

            {/* Show input fields only for the active exam type */}
            {activeExamType === examType &&
              formData.exams[examType].map((exam, index) => (
                <div key={index} className="flex mb-2">
                  <div className="w-1/2 mr-2">
                    <label className="block text-sm font-medium text-gray-600">Subject:</label>
                    <select
                      value={exam.subject}
                      onChange={(e) => handleExamChange(examType, index, 'subject', e.target.value)}
                      className="mt-1 p-2 border rounded-md w-full"
                      required
                    >
                      <option value="">Select Subject</option>
                      {['Hindi', 'English', 'Science', 'Social Science', 'Maths'].map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/2 ml-2">
                    <label className="block text-sm font-medium text-gray-600">Score:</label>
                    <input
                      type="number"
                      value={exam.score || ''}
                      onChange={(e) => handleExamChange(examType, index, 'score', e.target.value)}
                      className="mt-1 p-2 border rounded-md w-full"
                    />
                  </div>

                  {/* Button to remove the current set of exam inputs */}
                  <button
                    type="button"
                    onClick={() => handleRemoveExam(examType, index)}
                    className="mt-2 ml-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline-red active:bg-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}

            {/* Button to add a new set of exam inputs */}
            <button
              type="button"
              onClick={() => {
                handleAddExam(examType);
                handleSetActiveExamType(examType);
              }}
              className="mt-2 bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray active:bg-gray-500"
            >
              Add {examType} Exam
            </button>
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Studentmarks;
