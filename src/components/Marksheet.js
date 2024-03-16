// pages/marksheet/[rollNumber].js


import Background from "./Background";
import { allExams } from "@/helper/classOptions";




const Marksheet = ({ stuData, subjects }) => {

    const dummyData = stuData;


    const rollNumber = stuData.rollNumber;

    let totalObtainedMarks = 0; // Initialize total obtained marks
    let totalMaximumMarks = 0; // Initialize total maximum marks


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

    // Function to calculate total marks for a given exam type
    const calculateTotalMarks = (examType) => {
        return dummyData.exams[examType].reduce((total, subject) => total + (subject.score || 0), 0);
    };

    return (


        <div className=" container mx-auto p-4 shadow-md mt-5 relative h-[1090px] overflow-x-auto overflow-y-hidden ">

            <Background />

            <h1 className=" text-4xl font-bold mb-1 text-center text-orange-700">Madhav Saraswati Vidya Mandir</h1>
            <h4 className="text-3xl font-semibold mb-1 text-center text-orange-700">Senior Secondary School</h4>
            <h4 className="text-xl font-semibold mb-1 text-center text-blue-900">Madhavpuram, Prakash Nagar, Ghazipur</h4>
            {/* <Image src="/logo.png" width={70} height={70} alt="logo" className="absolute top-8 left-6"/> */}

            <div className="grid grid-cols-2 gap-4 mb-4 mt-10">

                <div>
                    <p className="mb-2">Roll Number: <span className="font-semibold"> {dummyData.rollNumber} </span></p>
                    <p className="mb-2">Name: <span className="font-semibold">{dummyData.firstName} </span></p>
                    <p className="mb-2">Fathers Name: <span className="font-semibold"> {dummyData.fatherName} </span></p>
                    <p className="mb-2">Class: <span className="font-semibold"> {dummyData.class} </span></p>
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
                    {subjects.map((subject) => (
                        <tr key={subject.subname}>
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
                        {allExams.map((examType) => (
                            <td key={examType} className="border border-gray-500 py-2 px-4">
                                {calculateTotalMarks(examType)}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>


            <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                    <p className=" left-4 mb-2 font-semibold">Position in Class:</p>
                    <p className=" left-4  font-semibold">RESULT:</p>
                </div>

                <div>
                    <p className="mb-2 font-semibold">Total Marks: {totalObtainedMarks}/{totalMaximumMarks}</p>
                    <p className="mb-2 font-semibold">Percentage : {totalObtainedMarks !== 0 ? ((totalObtainedMarks / totalMaximumMarks) * 100).toFixed(2) + "%" : "N/A"} </p>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-between">
                <div className="ml-5 mb-20 font-semibold text-blue-900">
                    <p >Class Teacher Signature: ________________</p>
                </div>
                <div className="mr-5 mb-10 font-semibold text-blue-900 ">
                    <p>Principal Signature: ________________</p>
                </div>
            </div>


        </div>


    );
};

export default Marksheet;
