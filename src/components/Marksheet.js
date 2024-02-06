// pages/marksheet/[rollNumber].js


import Background from "./Background";


const Marksheet =  ({stuData, subjects}) => {
  
   
    const rollNumber = stuData.rollNumber;
   
    const dummyData= stuData;
    

    if (!rollNumber) {
        return <p>Loading...</p>;
    }

    // Function to calculate total marks for a given exam type
    const calculateTotalMarks = (examType) => {
        return dummyData.exams[examType].reduce((total, subject) => total + (subject.score || 0), 0);
    };

    return (
        <div className="container mx-auto p-4 bg-white shadow-md mt-8 relative h-[1090px] ">
            <Background/>
            <h1 className="text-3xl font-bold mb-4 text-center">Madhav Saraswati Viddya Mandir</h1>
            <h4 className="text-xl font-bold mb-4 text-center">Prakash Nagar, Ghazipur</h4>

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
                    {subjects.map((subject) => (
                        <tr key={subject}>
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
                        {['pa1', 'pa2', 'pa3', 'halfYearly', 'annual'].map((examType) => (
                            <td key={examType} className="border border-gray-500 py-2 px-4">
                                {calculateTotalMarks(examType)}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>

           
            <div className="grid grid-cols-2 gap-4 mt-7">
                <div>
                <p className=" left-4  font-semibold">Position in Class:</p>
                </div>
                <div>
                    <p className="mb-2 font-semibold">Total Marks: {dummyData.totalMarks}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-20 mb-9">
                <div>
                    <p>Class Teacher Signature: ________________</p> 
                </div>
                <div>
                    <p>Principal Signature: ________________</p>
                </div>
            </div>
            
            
        </div>
    );
};

export default Marksheet;
