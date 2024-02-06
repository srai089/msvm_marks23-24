
"use client"

// TeacherLoginPage.js
import { useState } from "react";
import { useRouter } from "next/navigation";

const TeacherLoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    userId: "",
    className: "",
    password: "",
  });

  const classOptions = [
    "LKG",
    "UKG",
    "Class-1",
    "Class-2",
    "Class-3",
    "Class-4",
    "Class-5",
    "Class-6",
    "Class-7",
    "Class-8",
    "Class-9",
    "Class-10",
    "Class-11",
    "Class-12",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your authentication logic here
    // ...
   
    let resp= await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/teacherslogin`, {
      method:"POST",
      body:JSON.stringify(loginData)
    });
    resp= await resp.json();

    alert(resp.msg)
if(!resp.success){
router.push('/teacherslogin')
}else{
  router.push(`teacherslogin/${loginData.className}`)
}

    
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Teacher Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-600">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={loginData.userId}
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
            value={loginData.className}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="" disabled>
              Select Class
            </option>
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleGoHome}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherLoginPage;
