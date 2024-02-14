import { NextResponse } from "next/server";
export function POST (req, content){
    const authName= content.params.auth
const response= NextResponse.json({msg:"User Logout", success:true});
response.cookies.set(authName,"",{
expires: new Date(0)
});
return response;
}
