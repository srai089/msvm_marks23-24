import mongoose from "mongoose";
import { Subject } from "@/lib/model/selectsub";
import { NextResponse } from "next/server";

export async function GET(req, content){ 
    try {
        // Validate environment variable
        if (!process.env.DB) {
            throw new Error("Missing database connection string in environment variables.");
        }

        // Connect to the database
        await mongoose.connect(process.env.DB);


        // Create a new Subject instance
        const subject = await Subject.findOne({classname:content.params.clsname}).select("-classname");

      
        // Close the database connection
        // await mongoose.connection.close();

        // Return a structured response
        if(subject){
        return NextResponse.json({ msg: subject, success: true, status: 200 });
        }else{
            return NextResponse.json({ msg: "Subjects not selected for this class", success: false, status: 200 }); 
        }
        
    } catch (error) {
        console.error(error);

        // Return a structured error response
        return NextResponse.json({ msg: "Some error", success: false, status: 500 });
    }

}

export async function PUT(req, content){ 
    const _id= content.params.clsname
    try {
        // Validate environment variable
        const data= await req.json();
        if (!process.env.DB) {
            throw new Error("Missing database connection string in environment variables.");
        }

        // Connect to the database
        await mongoose.connect(process.env.DB);


        // Create a new Subject instance
        const subject = await Subject.findByIdAndUpdate(_id, data, {new:true} );

      
        // Close the database connection
        // await mongoose.connection.close();

        // Return a structured response
        if(subject){
        return NextResponse.json({ msg: subject, success: true, status: 200 });
        }else{
            return NextResponse.json({ msg: "Not Updated", success: false, status: 200 }); 
        }
        
    } catch (error) {
        console.error(error);

        // Return a structured error response
        return NextResponse.json({ msg: "Some error", success: false, status: 500 });
    }

}


