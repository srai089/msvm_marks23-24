import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Student } from "@/lib/model/student";

export async function GET(req, content) {
    try {
        await mongoose.connect(process.env.DB);
        const resp = await Student.find({ class: content.params.class })
        return NextResponse.json({ msg: resp, success: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Some error occured", success: false })
    }
}
export async function POST(req, content) {
    const data = await req.json()

    try {
        await mongoose.connect(process.env.DB);
        const [resp] = await Student.find(data);
        if (!resp) {
            return NextResponse.json({ msg: "Enroll No not found", success: false })
        }
        return NextResponse.json({ msg: resp, success: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Some error occured", success: false })
    }
}
