import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Teacher } from "@/lib/model/teacher";
import bcrypt from "bcryptjs"

//PUT api for single teacher
export async function PUT(req, content){
    const update= await req.json();
    await mongoose.connect(process.env.DB).then(() => {
        console.log("db Connected");
    }).catch((e) => console.log("db connection error part", e));
    const _id= content.params.teacherid;
    try {
        if(update.password){
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(update.password, salt);
        }
        const resp= await Teacher.findByIdAndUpdate({_id}, update, {new:true})
        return NextResponse.json({msg:"Update successfully", success:true})

    } catch (error) {
        console.log("teacher put error part", error);
        return NextResponse.json({msg:"Some error occured", success:false})
    } 
}

//GET api for single teacher

export async function GET(req, content){
    await mongoose.connect(process.env.DB).then(() => {
        console.log("db Connected");
    }).catch((e) => console.log("db connection error part", e));
    const _id= content.params.teacherid;
    try {
        const resp = await Teacher.findById({_id}).select("-password");
        return NextResponse.json({msg:resp, success:true})
    } catch (error) {
        console.log("teacher put error part", error);
        return NextResponse.json({msg:"Some error occured", success:false})
    }

}


export async function DELETE (req, content){
    await mongoose.connect(process.env.DB).then(() => {
        console.log("db Connected");
    }).catch((e) => console.log("db connection error part", e));
    const _id= content.params.teacherid;
    try {
        const resp = await Teacher.findByIdAndDelete(_id)
        return NextResponse.json({msg:resp, success:true})       
    } catch (error) {
        console.log("teacher put error part", error);
        return NextResponse.json({msg:"Some error occured", success:false})
    }

}