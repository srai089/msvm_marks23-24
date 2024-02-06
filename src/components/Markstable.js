"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const Markstable = ({ stuData, subjects }) => {
    const router = useRouter();
    const rollNumber = stuData.rollNumber;
    const dummyData = stuData;
   

    if (!rollNumber) {
        return <p>Loading...</p>;
    }

    // Function to calculate total marks for a given exam type
    const calculateTotalMarks = (examType) => {
        return dummyData.exams[examType].reduce((total, subject) => total + (subject.score || 0), 0);
    };

    return (
        <div className="container mx-auto p-4 bg-white  mt-3  ">


            <div className="grid grid-cols-2 gap-4 mb-8 mt-14">

                <div>
                    <p className="mb-2">Roll Number: {dummyData.rollNumber}</p>
                    <p className="mb-2">Name: {dummyData.firstName}</p>
                    <p className="mb-2">Fathers Name: {dummyData.fatherName}</p>
                    <p className="mb-2">Class: {dummyData.class}</p>
                </div>

            </div>
            <table className="w-full border-collapse border border-gray-500 mb-8">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-500 py-2 px-4">Subject</th>
                        <th className="border border-gray-500 py-2 px-4">PA1</th>
                        <th className="border border-gray-500 py-2 px-4">PA2</th>
                        <th className="border border-gray-500 py-2 px-4">PA3</th>
                        <th className="border border-gray-500 py-2 px-4">Half Yearly</th>
                        <th className="border border-gray-500 py-2 px-4">Annual</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects?.map((subject, ind) => (
                        <tr key={ind}>
                            <td className="border border-gray-500 py-2 px-4">{subject}</td>
                            {['pa1', 'pa2', 'pa3', 'halfYearly', 'annual'].map((examType) => (
                                <td key={examType} className="border border-gray-500 py-2 px-4">
                                    {dummyData.exams[examType].find((item) => item.subject === subject)?.score || 'N/A'}
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr className="bg-gray-200 font-bold">
                        <td className="border border-gray-500 py-2 px-4">Total</td>
                        {['pa1', 'pa2', 'pa3', 'halfYearly', 'annual'].map((examType, ind) => (
                            <td key={ind} className="border border-gray-500 py-2 px-4">
                                {calculateTotalMarks(examType)}
                            </td>
                        ))}
                    </tr>
                    {/* <tr>
                        <td></td>
                        {['pa1', 'pa2', 'pa3', 'halfYearly', 'annual'].map((examType, ind) => (
                            <td key={ind} className="border border-gray-500 ">
                                <button className="bg-green-500 text-white   w-full">
                                    Update
                                </button>
                            </td>
                        ))}
                    </tr> */}
                </tbody>
            </table>
            <div className="grid grid-cols-2 gap-2">

                <div>
                    <p className="mb-2">Total Marks: 1900</p>

                </div>
                <button onClick={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/addmarks/${dummyData._id}`)} className="bg-green-500 text-white  rounded w-full p-2">
                    Update Student Details and Marks
                </button>
            </div>


        </div>
    );
}

export default Markstable;