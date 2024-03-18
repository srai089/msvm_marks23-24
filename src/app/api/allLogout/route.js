import { NextResponse } from "next/server";
export function POST (req, content){
   
const response= NextResponse.json({msg:"User Logout", success:true});
response.cookies.set('jwt' ,"",{
expires: new Date(0)
});

response.cookies.set('authTeacher' ,"",{
    expires: new Date(0)
    });


return response;
}