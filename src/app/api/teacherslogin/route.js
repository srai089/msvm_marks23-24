import { Teacher } from "@/lib/model/teacher";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function POST(req){
   
    const data= await req.json();
    const {userId, className, password}= data;
    try {
        await mongoose.connect(process.env.DB)
        const result= await Teacher.findOne({userId});
       
        const verify = await bcrypt.compare(password, result.password);

        if(!verify || className!==result.className){
           
        //    const token=  jwt.sign(payload, process.env.TECHSECRETKEY, {expiresIn:"1h"})
            return NextResponse.json({msg:"Invalid User", success:false})
        }

        // token generation for verified user
        if(verify && className===result.className){
            const payload= {
                classTeacherName:result.classTeacherName,
                className:result.className
            }
           const token=  jwt.sign(payload, process.env.TECHSECRETKEY);
            return NextResponse.json({msg:"User Loged in", success:true},{
                headers:{
                    "Set-Cookie": `authTeacher=${token}; Path=/; HttpOnly; Secure;`,
                }
            })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({msg:"Some Error occured", success:false})
    }
   
   

}