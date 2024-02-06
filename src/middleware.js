import * as jose from "jose";
import { NextResponse } from "next/server";


export async function middleware(req) {

    //check teachers login 
    const regex = /^\/teacherslogin(\/.*)?$/
    const regex2 = /^\/teacherslogin(\/.*)$/;
    if (regex.test(req.nextUrl.pathname)) {

        try {
            const authTeacher = req.cookies.get('authTeacher')?.value;
            const teacherPayload = authTeacher && await jose.jwtVerify(authTeacher, new TextEncoder().encode(process.env.TECHSECRETKEY));
            const className = teacherPayload?.payload.className
            if (!teacherPayload && regex2.test(req.nextUrl.pathname)) {
                console.log("first if");
                return NextResponse.redirect(new URL("/teacherslogin", req.url))
            }
            if (req.nextUrl.pathname === "/teacherslogin" && teacherPayload) {
                console.log("second if");
                return NextResponse.redirect(new URL(`/teacherslogin/${className}`, req.url))
            }
            if (req.nextUrl.pathname!==`/teacherslogin/${className}` && req.nextUrl.pathname !== "/teacherslogin") {
                console.log("third if");
                return NextResponse.redirect(new URL(`/teacherslogin`, req.url))
            }
        } catch (error) {
            console.log("teachers login error part", error)
            if (req.nextUrl.pathname !== "/teacherslogin" && error.claim && error.claim === "exp") {
                return NextResponse.redirect(new URL("/teacherslogin", req.url))
            }

        }

    }


    // check admin page
   
    if (req.nextUrl.pathname === "/admin" || req.nextUrl.pathname === "/admin/admpage") {

        const toke = req.cookies.get('jwt')?.value;
        try {
            const payload = toke && await jose.jwtVerify(toke, new TextEncoder().encode(process.env.ADMINSECRETKEY))
            if (req.nextUrl.pathname == "/admin/admpage" && !payload) {

                return NextResponse.redirect(new URL("/admin", req.url))

            }

            if (toke && payload && req.nextUrl.pathname == "/admin") {
                return NextResponse.redirect(new URL("/admin/admpage", req.url))
            }
        } catch (error) {
            if (req.nextUrl.pathname !== "/admin" && error.claim && error.claim === "exp") {
                console.log("error part", error)
                return NextResponse.redirect(new URL("/admin", req.url))
            }
            console.log("after error admin");
        }

    }
    
  
      
    
}



export const config = {
    matcher: ["/admin/admpage", "/admin", "/teacherslogin/:path*", "/teacherslogin", "/api/:path*"]
}