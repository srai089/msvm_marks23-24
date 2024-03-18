"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Page(){

    const router= useRouter();
 
const logout= async ()=>{

    let resp= await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/allLogout`,{
        method:"POST",
    })
    
    resp= await resp.json();
   if(resp.success){
    router.push("/")
   }  
}

    return(
        <div>
            <h2 className=" text-red-800 mx-10 font-bold  text-2xl mt-15 cursor-pointer hover:underline" onClick={logout}> Please logout first.</h2>
            
       <Image src="/logout.jpg" alt="logout" width={300} height={350}  onClick={logout} className=" cursor-pointer" />
        </div>
    )

}