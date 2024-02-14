
import { useRouter } from "next/navigation";

export default function Logout({auth}){
    const router= useRouter();
 
const logout= async ()=>{

    let resp= await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/logout/${auth}`,{
        method:"POST",
    })
    
    resp= await resp.json();
   if(resp.success){
    router.push("/")
   }  
}
   
return(
    <div>
        <button
            onClick={logout}
            className="bg-blue-500 text-white py-1 text-sm px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Logout
          </button>
    </div>
)
}