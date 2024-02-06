
import Teachersedit from "@/components/Teachersedit";

export default function Page({ params }) {
    const techId = params.teachersId;
    return (
        <div>
            <h1>teachers login</h1>
           <Teachersedit teacherId= {techId}/>
        </div>
    )
}