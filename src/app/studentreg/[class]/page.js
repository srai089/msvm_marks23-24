"use client"
import { useState } from "react";
import Spiner from "@/components/Spiner";
import { useRouter } from "next/navigation";

export default function Page({params}) {
    const router= useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        fatherName: "",
        rollNumber: "",
        class:params.class
    });
    const [isLoading, setIsLoading]= useState(false);
    const [message, setMessage]=useState("");
    const handleChange = (e) => {
        setMessage("")
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data= JSON.stringify(formData);
        const resp= await fetch (`${process.env.NEXT_PUBLIC_HOST}/api/student`,{
            method:"POST",
            body:data
        })
   const result= await resp.json();
   setIsLoading(false);
   if(result.success){
    setMessage(result.msg)
    setFormData({...formData, 
        firstName: "",
        fatherName: "",
        rollNumber: "" })
   }else{
    setMessage(result.msg)
   }
      
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Student Information Form</h2>
            <h4 className="text-2xl font-semibold mb-4">({params.class})</h4>

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
                <div className="mb-4 h-4">
                    <p className="text-orange-600 font-bold italic">{message}</p>
                    
                </div>

                <div className="flex justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                    Submit
                </button>
                <button
                    onClick={()=>router.push("/teacherslogin")}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 px-5"
                >
                    Back
                </button>
                </div>
               
            </form>
            <div>
               {isLoading&&<Spiner/>} 
            </div>
        </div>

    )

}