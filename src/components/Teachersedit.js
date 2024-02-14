"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spiner from "./Spiner";



const Teachersedit = ({ teacherId} ) => {
   
    const router= useRouter();
    const [formData, setFormData] = useState({ 
        _id:"",
        userId:"",
        className:"",
        classTeacherName:""
    });
    const [loading, setLoading]= useState(false);
    useEffect(()=>{
        setLoading(true)
        const teacherDetail = async (id) => {
            let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/teacherreg/${id}`);
            data = await data.json();
           
           setFormData(data.msg)
           setLoading(false)
        }
        teacherDetail(teacherId);
    }, [])

   
   
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        let resp= await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/teacherreg/${formData._id}`, {
            method:"PUT",
            body:JSON.stringify(formData)
        });

        resp= await resp.json();
        setLoading(false)
        if(resp.success){
            router.push("/admin/admpage")
        }else{
            alert(resp.msg)
        }


    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Update Teacher Details</h2>
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
                        className="mt-1 p-2 w-full border rounded-md"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="className" className="block text-sm font-medium text-gray-600">
                        Class
                    </label>
                    <input
                        type="text"
                        id="className"
                        name="className"
                        value={formData.className}
                        className="mt-1 p-2 w-full border rounded-md"
                        readOnly
                    />

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
                <div className="h-9">
                    {loading && <Spiner/>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Update
                </button>         

            </form>
            <button
                    onClick={() => router.push("/admin")}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300  my-4"
                >
                    Back to Admin Page
                </button>

        </div>
    );
};

export default Teachersedit;
