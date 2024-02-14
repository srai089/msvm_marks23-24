
import Teachersedit from "@/components/Teachersedit";

export default function Page({ params }) {
    const techId = params.teachersId;
    return (
        <div>
           <Teachersedit teacherId= {techId}/>
        </div>
    )
}