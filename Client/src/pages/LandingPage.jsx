import Navbar_1 from '@/components/Navbar_1'
import { AuthContext } from '@/components/context/authContext'
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'

const LandingPage = () => {
  const {username, isLoggedIn} = useContext(AuthContext)

  return (
    <div>
      <Navbar_1/>
      <div className='w-full px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold'>Hi {isLoggedIn ? username : "User"}</h1>
          <h1 className='text-3xl font-bold'>Let's Code Your Way to Success!</h1>
        </div>
        <div className='flex flex-col sm:flex-row flex-wrap justify-between'>
          <div className='w-full sm:w-[48%] border my-4 rounded px-4 py-6'>
            <Button variant="outline">Online Compiler</Button>
          </div>
          <div className='w-full sm:w-[48%] border my-4 rounded px-4 py-6'>
            <h2 className='text-xl font-bold mb-2'>Profile</h2>
            {/* Add profile content here */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage