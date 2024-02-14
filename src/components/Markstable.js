"use client"
import { useRouter } from "next/navigation";
import { allExams } from "@/helper/classOptions";



const Markstable = ({ stuData, subjects, msgData }) => {
    const router = useRouter();
    
    let totalObtainedMarks = 0; // Initialize total obtained marks
    let totalMaximumMarks = 0; // Initialize total maximum marks

    const rollNumber = stuData.rollNumber;
    const dummyData = stuData;

    if (!rollNumber) {
        return <p>Loading...</p>;
    }

    // Iterate through subjects
    subjects?.forEach((subject) => {
        // Iterate through exam types
        allExams.forEach((examType) => {
            // Find the subject data for the current exam type
            const subjectData = dummyData.exams[examType].find((item) => item.subject === subject.subname);
            // If subject data exists, update the totals
            if (subjectData) {
                totalObtainedMarks += subjectData.score || 0; // Add obtained marks to total obtained marks
                dummyData.exams[examType].find((item) => item.subject === subject.subname)?.score &&
                    (totalMaximumMarks += subject[examType])  // Add maximum marks to total maximum marks
            }
        });
    });

    //delete student
    const handleDelStu= async (id)=>{
       let resp= await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addmarks/${id}`,{
            method:"DELETE"
        })
        resp= await resp.json();
        if(resp.success){
            msgData();
        }else{
            alert("Some error")
        }
    }

    // Function to calculate total marks for a given exam type
    const calculateTotalMarks = (examType) => {
        return dummyData.exams[examType].reduce((total, subject) => total + (subject.score || 0), 0);
    };

    return (
        <div className="container mx-auto p-4 bg-white  mt-3  ">


            <div className="grid grid-cols-2 gap-4 mb-8 mt-14">

                <div>
                    <p className="mb-2">Roll Number: <span className=" text-sm font-semibold"> {dummyData.rollNumber} </span></p>
                    <p className="mb-2">Name: <span className=" text-sm font-semibold">{dummyData.firstName}</span></p>
                    <p className="mb-2">Fathers Name: <span className=" text-sm font-semibold"> {dummyData.fatherName}</span></p>
                    <p className="mb-2">Class: <span className=" text-sm font-semibold">{dummyData.class}</span></p>
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
                            <td className="border border-gray-500 py-2 px-4">{subject.subname}</td>
                            {allExams.map((examType) => {
                                return <td key={examType} className="border border-gray-500 py-2 px-4">
                                    {dummyData.exams[examType].find((item) => item.subject === subject.subname)?.score || 'N/A'}
                                    {
                                        // subject ka maximum marks show karane ke liye agar subject me marks data fill hai           
                                        dummyData.exams[examType].find((item) => item.subject === subject.subname)?.score ?
                                            "/" + subject[examType] : ""
                                    }
                                </td>
                            }
                            )}
                        </tr>
                    ))}
                    <tr className="bg-gray-200 font-bold">
                        <td className="border border-gray-500 py-2 px-4">Total</td>
                        {allExams.map((examType, ind) => (
                            <td key={ind} className="border border-gray-500 py-2 px-4">
                                {calculateTotalMarks(examType)}
                            </td>
                        ))}
                    </tr>

                </tbody>
            </table>
        
                    <div className="lg:flex lg:justify-between md:flex md:justify-between md:mb-3 lg:mb-3">
                        <p className=" font-semibold text-sm">Total Marks: {totalObtainedMarks}/{totalMaximumMarks}</p>
                        <p className="mb-1 font-semibold text-sm">Percentage of Total Marks: {totalObtainedMarks!==0 && totalObtainedMarks<totalMaximumMarks
                         ? ((totalObtainedMarks / totalMaximumMarks) * 100).toFixed(2) + "%" : "N/A"} </p>
                    </div>

                             
                <div className="flex flex-col md:flex-row md:justify-between lg:flex-row lg:justify-between">
                    <button onClick={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/addmarks/${dummyData._id}`)} className="bg-green-500 text-white  rounded  p-1 mb-1 w-72">
                        Update Student Details and Marks
                    </button>
                    <button onClick={() => handleDelStu(dummyData._id)} className="bg-red-500 text-white  rounded  p-1 w-72">
                        Delete Student
                    </button>
                </div>

           


        </div>
    );
}

export default Markstable;