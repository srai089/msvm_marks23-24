"use client"
import { useState } from "react";
import Spiner from "@/components/Spiner";

const FindByName = ({ funCall }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [studentData, setStudentData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg]= useState("");
    const handleSearch = async () => {
        setIsLoading(true);
        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/findmarks`, {
                method: "POST",
                body: JSON.stringify({ name: searchQuery })
            });
            response = await response.json();
            setIsLoading(false);
            response.msg.length==0 && setMsg("No students found with the entered name.")
            setStudentData(response.msg);

        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="block text-gray-700 text-md font-bold mb-2">Search Marksheet By Student Name</h1>
            <div className="flex items-center space-x-2 mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter student name"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Search
                </button>
            </div>

            <div className=" w-80 text-center mx-auto  h-8">
                {isLoading && <Spiner />}
            </div>

            {studentData.length > 0 ? (
                <div>
                    <h2 className="text-xl font-bold mb-2">Search Results</h2>
                    <div className="grid grid-cols-2 gap-4 studentSearch">
                        {studentData.map((student, index) => (
                            <div key={index} className="border border-gray-300 rounded-md p-4">
                                <p className="font-bold">Name: {student.firstName}</p>
                                <p>Father Name: {student.fatherName}</p>
                                <p>Class: {student.class}</p>
                                <p>Enrollment Number: {student.rollNumber}</p>
                                <button
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                                    onClick={() => {
                                        setIsLoading(true);
                                        // Logic to navigate to marksheet page with enrollment number
                                        funCall(student.rollNumber);
                                        setIsLoading(false);
                                        console.log('Navigate to marksheet page with enrollment number:', student.rollNumber);
                                    }}
                                >
                                    View Marksheet
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) :(<p>{msg}</p>)
            }
          
        </div>
    );
};

export default FindByName;
