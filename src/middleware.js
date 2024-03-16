import * as jose from "jose";
import { NextResponse } from "next/server";


export async function middleware(req) {

    // Return public url 
    const publicUrl = ["/api/marksheet", "/api/teacherslogin", "/api/admin"];
    if (publicUrl.includes(req.nextUrl.pathname)) {
        return;
    };

    // subject select karne ya dikhane wala url ko return karna
    const regexPattern = /^\/api\/selectsub\/.+/;
    if (regexPattern.test(req.nextUrl.pathname)) {
        return;
    };

    //dono token ki value cookies se nikalne ke liye
    const teacherAuth = req.cookies.get("authTeacher")?.value;


    // agar dono me se koi token nahi hai aur url /teacherslogin ya /admin hai to

    if (req.nextUrl.pathname === "/teacherslogin" && !teacherAuth) {
        return;
    };

    //authTeachers token variefy karne ke liye- 
    const teachersLoginRegex = /^\/teacherslogin(?:\/.*)?$/;


    // wo path jise teacherAuth varificcation jaruri hai. isme alag karna hai regex se aur direct pathname se.
    // /api/student/Class-12 , /studentreg/Class-12 , /addmarks/[_id] , /api/addmarks/65dc6bd438cbe9ff75752eb3 ,
    // /genratemarksheet/Class-12 , /api/logout/authTeacher
    // pahle ye check karna hai k ye sabhi path rahe aur teacherAuth n ho to redirect kar dena hai /teacherslogin par
    // phir in path par teacherAuth ho to varifiy karna hai. 
    // iske liye do array banate hai ek jinme regex chahiye ek direct wale.
    // isme se abhi lagta hai k keval ek path hai /api/logout/ wala jo "admin" ko bhi chahiye. waha direct pathname likh kr ho jayega

    const teachersAllRegex = /^\/teacherslogin(?:\/.*)?$/.test(req.nextUrl.pathname)
        || /^\/api\/student(?:\/([^\/]+))*$/.test(req.nextUrl.pathname)
        || /^\/studentreg(?:\/.*)?$/.test(req.nextUrl.pathname)
        || /^\/addmarks(?:\/.*)?$/.test(req.nextUrl.pathname)
        || /^\/api\/addmarks(?:\/([^\/]+))*$/.test(req.nextUrl.pathname)
        || /^\/genratemarksheet(?:\/.*)?$/.test(req.nextUrl.pathname)
        || req.nextUrl.pathname === "/api/logout/authTeacher";

    if (teachersAllRegex && !teacherAuth) {
        return NextResponse.redirect(new URL(`/teacherslogin`, req.url))
    }

    // abhi ek problem ye hai k jis class ka token hai usi class ki detail aaye aur aisa kin endpoints par hai ye dekhne hai

    if (teachersAllRegex && teacherAuth) {
        try {
            const decoded = await jose.jwtVerify(teacherAuth, new TextEncoder().encode(process.env.TECHSECRETKEY));
            const pathArray = [`/teacherslogin/${decoded.payload.className}`, `/api/student/${decoded.payload.className}`,
            `/studentreg/${decoded.payload.className}`, `/genratemarksheet/${decoded.payload.className}`, "/api/logout/authTeacher"];
            if (pathArray.includes(req.nextUrl.pathname)) {
                return;
            }

            if (/^\/addmarks(?:\/.*)?$/.test(req.nextUrl.pathname) || /^\/api\/addmarks(?:\/([^\/]+))*$/.test(req.nextUrl.pathname)
                || req.nextUrl.pathname === '/api/student'
            ) {
                return;
            }
            return NextResponse.redirect(new URL(`/teacherslogin/${decoded.payload.className}`, req.url))

        } catch (error) {
            console.log("error");
            return NextResponse.redirect(new URL(`/`, req.url))

        }

    };
    // admin token checking

    // kuch aur aise path jo admin login ke bad hi use honge
    //    /api/teacherreg , /api/teacherreg/65867ffe073e4185d1cfbb6b , /regteachers , /admin/admpage/[teachersId] , 
    // /admin/chngpsw/65867ffe073e4185d1cfbb6b , /api/logout/jwt

    // /api/teacherreg , /admin , 
    // /regteachers , /api/logout/jwt

    const adminAuth = req.cookies.get("jwt")?.value;
    if (req.nextUrl.pathname === "/admin" && !adminAuth) {
        return;
    }

    const allAdminRegex = /^\/admin(?:\/.*)?$/.test(req.nextUrl.pathname)
        || req.nextUrl.pathname === "/regteachers"
        || /^\/api\/teacherreg(?:\/([^\/]+))*$/.test(req.nextUrl.pathname)
        || req.nextUrl.pathname === "/api/logout/jwt"

    if (allAdminRegex && !adminAuth) {
        return NextResponse.redirect(new URL(`/admin`, req.url))
    };

    if (allAdminRegex && adminAuth) {
        try {
            const decoded = await jose.jwtVerify(adminAuth, new TextEncoder().encode(process.env.ADMINSECRETKEY));
            if (req.nextUrl.pathname === "/admin") {
                return NextResponse.redirect(new URL(`/admin/admpage`, req.url))
            }

        } catch (error) {
            console.log("error");
            return NextResponse.redirect(new URL(`/`, req.url))
        }

    }

}

export const config = {
    matcher: ["/admin/:path*", "/teacherslogin/:path*", "/api/:path*", "/genratemarksheet/:path*",
        "/regteachers", "/studentreg/:path*", "/addmarks/:path*"]
}
