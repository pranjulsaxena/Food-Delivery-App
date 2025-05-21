import React, { use } from 'react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

function VerifyPassword() {
    const [otp, setotp] = useState<string[]>(["","","","","",""])

  return (
    <div className='min-h-screen flex justify-center items-center text-center'>
      <form action="" className='max-w-md md:w-full md:border-2 md:border-black p-8 rounded-lg'>
        <div><h1 className='text-2xl font-extrabold'>Verify Password</h1></div>
        <div className='mb-4'><span className='text-slate-500 '>Enter the OTP sent to your email</span></div>
        <div className='flex gap-x-3'>
            {otp.map((items:string,index:number)=>(<Input key={index} maxLength={1}  className='focus-visible:ring-1  focus-visible:ring-indigo-500 text-center w-8 h-8 text-sm md:text-2xl font-normal md:font-bold md:w-12 md:h-12'/>))}
        </div>

      </form>
    </div>
  )
}

export default VerifyPassword
