import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LineChart, Loader, Loader2 } from 'lucide-react'
import { Mail } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'
import { Link, useSearchParams } from 'react-router-dom'
import { useState } from 'react'

function ForgotPassword() {
    const [Loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <form action="" className='max-w-md md:w-full rounded-lg md:border-1 md:border-black  text-center p-8'>
                <div className='mb-1'><h1 className='font-extrabold text-xl'>Forgot Password</h1></div>
                <p className='text-slate-500 mb-5'>Enter email address to reset password</p>
                <div className='relative'>
                    <div className='mb-4'>
                        <Input value={email} placeholder='Enter your Email' type="email" onChange={(e) => { setEmail(e.target.value) }} className='focus-visible:ring-1 pl-10'></Input>
                    </div>
                    <Mail className=" bottom-1 left-2 absolute text-gray-500"></Mail>

                </div>
                <div>
                    {Loading ? <Button className='bg-[#D19254] hover:bg-[#d18c47] w-full'><Loader2 className='animate-spin mr-2 w-4 h-4'></Loader2>Loading ...</Button> : <Button className='bg-[#D19254] hover:bg-[#d18c47] w-full'>Send Reset Link</Button>}
                </div>
                <Separator />
                <p className='mt-4'>Back to <Link className='text-blue-500 underline hover:text-blue-700' to="/login">Login</Link></p>
            </form>

        </div>
    )
}

export default ForgotPassword
