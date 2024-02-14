import React from 'react';
import { Roboto } from 'next/font/google'
const roboto= Roboto({
    weight:"100",
    display:'swap',
    subsets:["latin"]
})

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-1 text-center mt-auto w-full mx-0" >
        <div className='container mx-autp'>

        
      <p className={roboto.className}>&copy; 2024 Kaval Tech, Peernagar, Ghazipur-233001</p>

      </div>

   
     
    </footer>
  );
};

export default Footer;
