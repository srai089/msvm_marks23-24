"use client"
import { useState, useEffect } from "react";
import Marksheet from "@/components/Marksheet";
import { useRouter } from "next/navigation";


const subjectList = async (classname) => {
    let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/selectsub/${classname}`);
    resp = await resp.json();
    if (resp.success) {
        const subjectarray = resp.msg.subject.map((sub) => {
            return sub.subname;
        })
        return subjectarray
    } else {
        alert(resp.msg)
    }
}

export default function Page() {
    const [enroll, setEnroll] = useState("");
    const [response, setResponse] = useState({})
    const [status, setStatus] = useState(false)
    const [subjects, setSubjects] = useState([]);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/marksheet`, {
            method: "POST",
            body: JSON.stringify({ rollNumber: enroll })
        });
        resp = await resp.json()


        if (resp.success) {
            response.class = resp.msg.class;            
            const list = await subjectList(resp.msg.class);
            setSubjects(list)
            setResponse(resp.msg)
            setStatus(resp.success)
        }else{
            alert("Enroll No not found");
        }

    }


    
    return (
        !status ? <div className="mt-14">
            <button
                onClick={() => router.push("/")}
                className="absolute top-8 right-8 text-blue-500 hover:underline focus:outline-none font-semibold">
                HOME
            </button>
            <h1 className="text-4xl font-bold mb-8 text-red-600 text-center">
                Student Management System Year 2023-24
            </h1>
            <h1 className="text-3xl font-bold mb-4 text-center">Madhav Saraswati Viddya Mandir</h1>
            <h4 className="text-xl font-bold mb-4 text-center">Prakash Nagar, Ghazipur</h4>


            <form onSubmit={handleSubmit} className="bg-white shadow-md  rounded px-8 pt-6 pb-8 mb-4 w-96 mx-auto h-[200px] mt-16">
                <div className="mb-4 ">
                    <label htmlFor="enroll" className="block text-gray-700 text-md font-bold mb-2">
                        Enter Enrollment Number to Show Marks:
                    </label>
                    <input
                        id="enroll"
                        name="enroll"
                        value={enroll}
                        onChange={(e) => setEnroll(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className=" w-24 mx-auto mt-20">
                <button
                    onClick={() => router.push("/")}
                    className="text-blue-500 hover:underline focus:outline-none font-semibold"
                >
                    BACK
                </button>
            </div>
        </div>

            :
            <div>
                <Marksheet stuData={response} subjects={subjects} />
                <button
                    onClick={() => setStatus(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-14 w-48 ml-7 mb-11"
                >
                    Back
                </button>

            </div>
    )
}