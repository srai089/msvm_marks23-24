"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spiner from '@/components/Spiner';
import { allSubList } from '@/helper/classOptions';

const ExamMarksEntry = ({ params }) => {
    const classname = params.clsname;
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [examMarks, setExamMarks] = useState([]);
    const [success, setSuccess] = useState(false);
    const [classId, setClassId]= useState();
    const [isLoading, setIsLoading]= useState(true);
    const router = useRouter();

    useEffect(() => {
        const getSubject = async () => {
            let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/selectsub/${classname}`);
            resp = await resp.json();
            setIsLoading(false)
            if (resp.success) {
                setExamMarks(resp.msg.subject);
                setSuccess(true);
                setClassId( resp.msg._id)
            }

        };
        getSubject();
    }, [])

    const handleSubjectSelect = (subject) => {
        if (!selectedSubjects.includes(subject)) {
            setSelectedSubjects([...selectedSubjects, subject]);
            setExamMarks([...examMarks, { subname: subject, pa1: 0, pa2: 0, pa3: 0, halfYearly: 0, annual: 0 }]);
        }
    };

    const handleMarksEntry = (subject, examType, marks) => {
        const updatedExamMarks = [...examMarks];
        const index = updatedExamMarks.findIndex((item) => item.subname === subject);

        if (index !== -1) {
            updatedExamMarks[index][examType] = marks;
            setExamMarks(updatedExamMarks);
        }
    };

    const handleSubjectDelete = (subject) => {
        const updatedSubjects = selectedSubjects.filter((item) => item !== subject);
        const updatedExamMarks = examMarks.filter((item) => item.subname !== subject);

        setSelectedSubjects(updatedSubjects);
        setExamMarks(updatedExamMarks);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const data = {
            classname,
            subject: examMarks
        }
      
        const subjectdata = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/selectsub`, {
            method: "POST",
            body: JSON.stringify(data)
        });
        const resp = await subjectdata.json();
        setIsLoading(false)
        if (resp.success) {
            router.push("/teacherslogin")
        } else {
            alert("some error")
        }
    }

    const handleUpdate = async () => {
        setIsLoading(true);
        const data = {
            classname,
            subject: examMarks
        }
       
        const subjectdata = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/selectsub/${classId}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
        const resp = await subjectdata.json();
        setIsLoading(false)
        if (resp.success) {
           
            router.push("/teacherslogin")
        } else {
            alert("some error")
         
        }
    }

    return (
        <div className="container mx-auto p-4 overflow-y-auto">
            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">Select Subjects:</h2>
                <ul className="flex flex-wrap">
                    {allSubList.map((subject) => (
                        <li
                            key={subject}
                            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2"
                            onClick={() => handleSubjectSelect(subject)}
                        >
                            {subject}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {isLoading && <Spiner/>}
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">Selected Subjects and Marks:</h2>
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Subject</th>
                            <th className="border px-4 py-2">PA1</th>
                            <th className="border px-4 py-2">PA2</th>
                            <th className="border px-4 py-2">PA3</th>
                            <th className="border px-4 py-2">Half Yearly</th>
                            <th className="border px-4 py-2">Annual</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examMarks.map((item, index) => (
                            <tr key={index} className="text-center">
                                <td className="border px-4 py-2">{item.subname}</td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        value={item.pa1}
                                        onChange={(e) => handleMarksEntry(item.subname, 'pa1', e.target.value)}
                                        className="w-full"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        value={item.pa2}
                                        onChange={(e) => handleMarksEntry(item.subname, 'pa2', e.target.value)}
                                        className="w-full"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        value={item.pa3}
                                        onChange={(e) => handleMarksEntry(item.subname, 'pa3', e.target.value)}
                                        className="w-full"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        value={item.halfYearly}
                                        onChange={(e) => handleMarksEntry(item.subname, 'halfYearly', e.target.value)}
                                        className="w-full"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        value={item.annual}
                                        onChange={(e) => handleMarksEntry(item.subname, 'annual', e.target.value)}
                                        className="w-full"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleSubjectDelete(item.subname)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    !success ?
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800  mt-11 w-full"
                        >
                            Submit
                        </button>
                        :
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800  mt-11 w-full"
                        >
                            Update
                        </button>
                }


            </div>
            <button
                            onClick={()=>router.push(`/teacherslogin/${classname}`)}
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800  mt-11 w-20"
                        >
                            Back
                        </button>
        </div>
    );
};

export default ExamMarksEntry;
