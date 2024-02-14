import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MSVM Examination Results for year 23-24',
  description: 'Discover the results of MSVM Examination for the year 23-24 showcasing student achievements and performance.',
}

export default function RootLayout({ children }) {
  return (
    
    <html lang="en" >
      <body className={inter.className }
      style={{display:"flex", flexDirection:"column",height:"100vh"}}
      >
      <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
   
  )
}
