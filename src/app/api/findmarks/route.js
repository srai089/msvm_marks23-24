import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Student } from "@/lib/model/student";

export async function POST(req, content) {
    const searchQuery= await req.json();
    await mongoose.connect(process.env.DB);
    console.log("db connected");
    const data = await Student.find({ firstName: { $regex: new RegExp(searchQuery.name, 'i') } });
    return NextResponse.json({ msg: data })
}