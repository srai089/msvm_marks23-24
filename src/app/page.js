// // pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/image.png')", // Replace with the actual path to your transparent image in the public folder
        backgroundColor: "rgba(255, 255, 255, 0.3)", // Background color with 30% opacity
      }}
    >
      <Link href="/admin"
        className="absolute top-8 right-8 text-blue-500 hover:underline focus:outline-none font-semibold">
        ADMIN
      </Link>

      <h1 className="text-4xl font-bold mb-8 text-red-600">
        Student Management System Year 2023-24
      </h1>
      <Link href="/teacherslogin">
        <div className="text-lg text-blue-500 hover:underline mb-4 cursor-pointer text-blue-900 transition-all hover:bg-blue-100 px-2 py-1 rounded-md">
          Teacher Login
        </div>
      </Link>
      <Link href="/enrollno">
        <div className="text-lg text-blue-500 hover:underline cursor-pointer text-blue-900 transition-all hover:bg-blue-100 px-2 py-1 rounded-md">
          Student Login
        </div>
      </Link>
    </div>
  );
}


