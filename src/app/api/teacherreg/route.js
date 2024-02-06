import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { Teacher } from "@/lib/model/teacher";
export async function POST(req) {
    const regdata = await req.json();
    const { userId, className, classTeacherName, password, confirmPassword } = regdata;
    if (password !== confirmPassword) {
        return NextResponse.json({ sucess: false, msg: "Password and confirm password should be same" });
    };
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);
    try {
        await mongoose.connect(process.env.DB).then(() => {
            console.log("db Connected");
        }).catch((e) => console.log("db connection error part", e))

        const teacherData = new Teacher({ userId, className, classTeacherName, password: passHash });
         await teacherData.save();
        
        return NextResponse.json({ msg: "Registered successfully", success:true })
    } catch (error) {

        if (error.errors?.userId?.message) {
            return NextResponse.json({ msg: error.errors.userId.message, success: false })
        }
        if (error.errors?.className?.message) {
            return NextResponse.json({ msg: error.errors.className.message, success: false })
        }
        if (error.errors?.classTeacherName?.message) {
            return NextResponse.json({ msg: error.errors.classTeacherName.message, success: false })
        }
        if (error.errors?.password?.message) {
            return NextResponse.json({ msg: error.errors.password.message, success: false })
        }
        if (error?.code === 11000 && error.keyPattern.userId) {
            return NextResponse.json({ msg: "Username is already registered", success: false })
        }
        console.log(error);
        return NextResponse.json({msg:"Some error occured", success:false})
    }
}

export async function GET(){
    try {
        await mongoose.connect(process.env.DB).then(() => {
            console.log("db Connected");
        }).catch((e) => console.log("db connection error part", e))
        const teachersList= await Teacher.find().select("-password");
        return NextResponse.json({msg:teachersList, success:true})
    } catch (error) {
        return NextResponse.json({msg:"Some error occured", success:false})
    }
}

