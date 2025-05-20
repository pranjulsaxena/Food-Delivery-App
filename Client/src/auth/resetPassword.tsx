import React from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LineChart, Loader, Loader2, LockKeyhole } from 'lucide-react'
import { Mail } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'
import { Link, useSearchParams } from 'react-router-dom'
import { useState } from 'react'

function ResetPassword() {
    const [Loading, setLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <form action="" className='max-w-md md:w-full rounded-lg md:border-1 md:border-black  text-center p-8'>
                <div className='mb-1'><h1 className='font-extrabold text-xl'>Reset Password</h1></div>
                <p className='text-slate-500 mb-5'>Set new password to login</p>
                <div className='relative'>
                    <div className='mb-4'>
                        <Input value={password} placeholder='Enter new Password' type="Password" onChange={(e) => { setPassword(e.target.value) }} className='focus-visible:ring-1 pl-10'></Input>
                    </div>
                    <LockKeyhole className=" bottom-1 left-2 absolute text-gray-500"></LockKeyhole>

                </div>
                <div>
                    {Loading ? <Button className='bg-[#D19254] hover:bg-[#d18c47] w-full'><Loader2 className='animate-spin mr-2 w-4 h-4'></Loader2>Loading ...</Button> : <Button className='bg-[#D19254] hover:bg-[#d18c47] w-full'>Reset</Button>}
                </div>
                <Separator />
                <p className='mt-4'>Back to <Link className='text-blue-500 underline hover:text-blue-700' to="/login">Login</Link></p>
            </form>

        </div>
    )
}

export default ResetPassword

