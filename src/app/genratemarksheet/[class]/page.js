"use client"
import Marksheet from "@/components/Marksheet";
import { useState, useEffect } from 'react';
import Spiner from "@/components/Spiner";
import html2pdf from "html2pdf.js";




export default function Page({ params }) {
    const [studentData, setStudentData] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [isLoading, setIsLoading]= useState(true);
    useEffect(() => {
        // fetch student detail
        const getData = async () => {
            let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/student/${params.class}`);
            resp = await resp.json();
            setStudentData(resp.msg)
        }
        getData();

    }, [params.class])

    useEffect(() => {
        // fetch subject list
        const subjectList = async (classname) => {
            let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/selectsub/${classname}`);
            resp = await resp.json();
            setIsLoading(false)
            if (resp.success) {
                const subjectarray = resp.msg.subject.map((sub) => {
                    return sub.subname;
                })
                setSubjects(subjectarray);
            } else {
                alert(resp.msg)
            }
        }
        subjectList(params.class)
    }, [params.class]);

    const generatePDF = () => {
        const pdfElement = document.getElementById('pdf-container');
        html2pdf(pdfElement);
    }

    return (
        <div>
            
            <div id="pdf-container" className="mt-20">
                {studentData?.map((student) => (
                    <div key={student._id}>
                        <Marksheet stuData={student} subjects={subjects} />
                    </div>
                ))}
            </div>
                <div>
                    {isLoading&&<Spiner/>}
                </div>
            <button
                onClick={generatePDF}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mx-4 absolute top-24 right-3"
            >
                Print as PDF
            </button>

        </div>
    )

}