"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spiner from "@/components/Spiner";


const Page = ({ params }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        _id: "",
        userId: "",
        className: "",
        password: "",
        cpassword: ""
    });
    const [loading, setLoading]= useState(false);
    const [message, setMessage]= useState("")

    useEffect(() => {
        setLoading(true);
        const teacherDetail = async (id) => {
            let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/teacherreg/${id}`);
            data = await data.json();
           setLoading(false);
            if (data.success) {
                setFormData({ ...formData, _id: data.msg._id, userId: data.msg.userId, className: data.msg.className })
            } else {
                setMessage(data.msg)
            }
        }
        teacherDetail(params.teacherId);
    }, [])

    const handleChange = (e) => {
        setMessage("")
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
       
        e.preventDefault();
      
        if (formData.password !== formData.cpassword) {
            setMessage("Password and Confirm Password should be same");
            return;
        }
        function isPasswordValid(password) {
            // Minimum length of 8 characters
            const minLength = 8;

            // Check if password meets complexity requirements
            const hasUpperCase = /[A-Z]/.test(password);
            const hasNumber = /\d/.test(password);

            return password.length >= minLength && hasUpperCase && hasNumber;
        }

        if (!isPasswordValid(formData.password)) {

            setMessage('Password should be at least 8 characters long and contain at least one uppercase letter and one number.')
            return;
        }
        setLoading(true);
       const data= {
        userId: formData.userId,
        className: formData.className,
        password: formData.password
       }
        let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/teacherreg/${formData._id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });

        resp = await resp.json();
        setLoading(false);
        if (resp.success) {
           
            router.push("/admin/admpage")
        } else {
            setMessage(resp.msg)
        }
    };
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
            <div className=" h-20">
            <p className="text-red-500">{message}</p>
            </div>
            <form onSubmit={handleSubmit} >
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        New Password
                    </label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        className="mt-1 p-2 w-full border rounded-md"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cpassword" className="block text-sm font-medium text-gray-600">
                        Confirm New Password
                    </label>
                    <input
                        type="text"
                        id="cpassword"
                        name="cpassword"
                        value={formData.cpassword}
                        className="mt-1 p-2 w-full border rounded-md"
                        onChange={handleChange}
                        required
                    />

                </div>
                <div className="h-9">
                    {loading&&<Spiner/>}
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
    )


}

export default Page;