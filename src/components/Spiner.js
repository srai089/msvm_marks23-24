
import {BeatLoader} from "react-spinners"

export default function Spiner() {
    return (
        <div className=" mt-1 flex">
      
      <p className=" text-sm font-bold mr-2 leading-4 text-red-800" >Please wait, page is loading</p>

      
      <BeatLoader color="#4f4f4f" />
        </div>
    )
}