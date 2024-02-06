"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const Page = ({ params }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        _id: "",
        userId: "",
        className: "",
        password: "",
        cpassword: ""
    });

    useEffect(() => {
        const teacherDetail = async (id) => {
            let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/teacherreg/${id}`);
            data = await data.json();
           
            if (data.success) {
                setFormData({ ...formData, _id: data.msg._id, userId: data.msg.userId, className: data.msg.className })
            } else {
                alert(data.msg)
            }
        }
        teacherDetail(params.teacherId);
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (formData.password !== formData.cpassword) {
            alert("Password and Confirm Password should be same");
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

            alert('Password should be at least 8 characters long and contain at least one uppercase letter and one number.')
            return;
        }

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
        if (resp.success) {
            alert("Password Changed Successfuly");
            router.push("/admin/admpage")
        } else {
            alert(resp.msg)
        }
    };
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Password
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
                        Confirm Password
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