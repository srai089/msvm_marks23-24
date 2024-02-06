import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Student } from "@/lib/model/student";

export async function GET(req, content){
    try {
        await mongoose.connect(process.env.DB);
        console.log("student db connected");
        
       const resp= await Student.find({class:content.params.class})
return NextResponse.json({msg:resp, success:true})
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg:"Some error occured", success:false})
    }


}