import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Student } from "@/lib/model/student";

export async function GET(req, content) {
    await mongoose.connect(process.env.DB);

    const data = await Student.find();
    console.log("db connected");
    return NextResponse.json({ msg: data })
}

export async function POST(req, content) {

    try {
        await mongoose.connect(process.env.DB);
        console.log("student db connected");
        const data = await req.json();
        const result = new Student(data);
        const resp = await result.save();
        return NextResponse.json({ msg: "Saved successfuly", success: true })
    } catch (error) {
        console.log("student post error", error);
        if (error?.code == 11000) {
            return NextResponse.json({ msg: "Duplicate Roll No", success: false })
        }
        return NextResponse.json({ msg: "some error occured", success: false })
    }
}