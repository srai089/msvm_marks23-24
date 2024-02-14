
import Image from 'next/image';
import Link from 'next/link'; 
import { Roboto } from 'next/font/google';

const roboto= Roboto({
  weight:"500",
  display:'swap',
  subsets:["latin"]
})

const Navbar = () => {
 

 

  return (
    <nav className={` flex justify-between px-2}`}>
      <ul className="lg:flex items-center p-2">
        <li className="mr-6">
          <Link href="/" passHref>
            <div className={`text-orange-900 hover:text-red-600 hover:underline cursor-pointer text-md font-bold ${roboto.className}`}  >Home</div>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/teacherslogin" passHref>
            <div className={`text-orange-900 hover:text-red-600 hover:underline cursor-pointer text-md font-bold ${roboto.className} }`} >Faculty Portal</div>
          </Link>
        </li>
        <li>
          <Link href="/admin" passHref>
            <div className={`text-orange-900 hover:text-red-600 hover:underline cursor-pointer text-md font-bold ${roboto.className} }`} >Admin</div>
          </Link>
        </li>
      </ul>
      <Image
            className='m-2'
            src="/logo.png"
            width={80}
            height={80}
            alt="logo"
          />
    </nav>
  );
};

export default Navbar;
