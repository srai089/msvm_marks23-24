
"use client"

// TeacherLoginPage.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spiner from "@/components/Spiner";
import { classOptions } from "@/helper/classOptions";


const TeacherLoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    userId: "",
    className: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg]= useState("")



  const handleChange = (e) => {
    setMsg("")
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();

    let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/teacherslogin`, {
      method: "POST",
      body: JSON.stringify(loginData)
    });
    resp = await resp.json();
    setIsLoading(false)
    if (!resp.success) {
      setMsg("Some error! Check User Id and Password.")
    } else {
      router.push(`teacherslogin/${loginData.className}`)
    }


  };


  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md w-80">
      <h2 className="text-2xl font-semibold mb-4">Teacher Login</h2>
      <div className="h-8 mb-3">
        <p className="text-red-500 text-sm font-semibold italic">{msg}</p>
      </div>
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
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
          >
            Login
          </button>

        </div>
      </form>
      <div>
        {isLoading && <Spiner />}
      </div>
    </div>
  );
};

export default TeacherLoginPage;
