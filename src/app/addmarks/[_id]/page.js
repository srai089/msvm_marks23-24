import Studentmarks from "@/components/Studentmarks";
import Stumarks from "@/components/Stumarks";


export default function Page({params}){
    const {_id}= params
    return(
        <div>
            <Stumarks _id={_id}/>
        </div>
    )
}