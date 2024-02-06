"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { classOptions } from "@/helper/classOptions";

const TeacherRegistrationForm = () => {
  const router= useRouter();
  const [formData, setFormData] = useState({
    userId: "",
    className: "",
    classTeacherName: "",
    password: "",
    confirmPassword: "",
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {

    e.preventDefault();
    function isPasswordValid(password) {
      // Minimum length of 8 characters
      const minLength = 8;

      // Check if password meets complexity requirements
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);

      return password.length >= minLength && hasUpperCase && hasNumber;
    }
    const { userId, password } = formData;
    if (userId && userId.includes(' ')) {
      alert("User ID should not contain spaces.")
      return;
    };
    if (userId.length < 8) {
      alert('User ID should be at least 8 characters long.')
      return;
    };

    if (!isPasswordValid(password)) {

      alert('Password should be at least 8 characters long and contain at least one uppercase letter and one number.')
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password and confirm password should be same");
      return;
    }
    // logic to handle form submission here
    const regDetail= await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/teacherreg`,{
      method:"POST",
      body:JSON.stringify(formData)
    });
    const resp= await regDetail.json();
  
    if(resp.success){
      alert(resp.msg);
      setFormData({
        userId: "",
        className: "",
        classTeacherName: "",
        password: "",
        confirmPassword: "",
      })
    }else{
      alert(resp.msg)
    }
    
    
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Teacher Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-600">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="className" className="block text-sm font-medium text-gray-600">
            Class
          </label>
          <select
            id="className"
            name="className"
            value={formData.className}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="" disabled>Select Class</option>
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="classTeacherName" className="block text-sm font-medium text-gray-600">
            Class Teacher Name
          </label>
          <input
            type="text"
            id="classTeacherName"
            name="classTeacherName"
            value={formData.classTeacherName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Register
        </button>

        <button
        onClick={()=>router.push('/admin/admpage')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mx-4"
        >
          Back to Admin Page
        </button>
       
      </form>
     
    </div>
  );
};

export default TeacherRegistrationForm;
