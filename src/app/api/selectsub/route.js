import mongoose from "mongoose";
import { Subject } from "@/lib/model/selectsub";
import { NextResponse } from "next/server";

export async function POST(req){
   
    try {
        // Validate environment variable
        if (!process.env.DB) {
            throw new Error("Missing database connection string in environment variables.");
        }

        // Connect to the database
        await mongoose.connect(process.env.DB);

        // Validate and parse incoming JSON data
        const data = await req.json();
        if (!data || typeof data !== "object") {
            throw new Error("Invalid data format");
        }

        // Create a new Subject instance
        const subject = new Subject(data);

        // Save the Subject to the database
        const saveSub = await subject.save();

        // Close the database connection
        // await mongoose.connection.close();

        // Return a structured response
        return NextResponse.json({ msg: saveSub, success: true, status: 200 });
    } catch (error) {
        console.error(error);

        // Return a structured error response
        return NextResponse.json({ msg: error.message || "Some error", success: false, status: 500 });
    }

}


