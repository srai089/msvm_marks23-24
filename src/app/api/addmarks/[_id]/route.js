import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Student } from "@/lib/model/student";

export async function PUT(req, content){
    const data= await req.json();
    const _id= content.params._id
    try {
        await mongoose.connect(process.env.DB);
        console.log("student db connected");
        
       const resp= await Student.findByIdAndUpdate(_id, data)
return NextResponse.json({msg:"Update successfully", success:true})
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg:"Some error occured", success:false})
    }
}

export async function GET(req, content){
    const _id= content.params._id
    try {
        await mongoose.connect(process.env.DB);
        console.log("student db connected");
        
       const resp= await Student.findById(_id)
return NextResponse.json({msg:resp, success:true})
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg:"Some error occured", success:false})
    }
}