import { NextResponse } from "next/server";
import jwt  from "jsonwebtoken";


export async function POST(req){

    const adminData= await req.json();
    if(adminData.user!=="admin" || adminData.password!==process.env.ADMIN_PASS){
        return NextResponse.json({msg:"Please Input Valid Detail", success:false})
    }
    

  const payload = {
    user: adminData.user,
    role: "admin"
  };
 

  const token= jwt.sign(payload, process.env.ADMINSECRETKEY,{expiresIn:"1h"} );
  

  // Set the token in cookies
  return NextResponse.json({
    msg: "You are login successfully",
    success: true,
    token: token,
  }, {
    headers: {
      "Set-Cookie": `jwt=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });

}

