'use client';
import React, {useState} from 'react'
import AuthInput from '../UI/AuthInput'
import AuthSubmit from '../UI/AuthSubmit'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

const LoginCard = () => {
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');

    const router = useRouter();
    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: psw
        };

        try {
            const response = await api.post('/auth/login', payload);
            const token = response.data.access_token;
            localStorage.setItem('snipe_token', token);
            router.push('/dashboard');

        } catch (error: any) {
            console.error('Login failed: ', error.response?.data || error.message)
        }
    }

    return (
        <div className='w-[26.25rem] h-fit flex flex-col rounded-xl bg-white'>
            <div className='w-[100%] h-fit flex flex-col justify-center items-center '>
            
            <div className='w-[100%] h-fit gap-[10px] flex flex-col items-center px-[1.5rem] pt-[2rem] pb-[1rem]'>
                <div>
                <div className='w-fit h-fit  text-xl font-bold tracking-1 leading-[1.75rem] '>Snipe AI</div>
                </div>
                <div className=' text-2xl tracking-1 font-bold leading-[1.75rem] align-middle'>Welcome back.</div>
                <div className=' text-sm font-regular leading-[1.25rem] pt-[0.5rem] text-grey'>Sign in to access your editor tools.</div>
            </div>
            
            <form onSubmit={handleSubmitForm} className='py-[0.5rem] px-[1.5rem] gap-[1rem] w-[100%] h-fit flex flex-col' >
                <AuthInput id='login-email' name='email' autocomplete='email' fieldName='Email Address' placeholder='name@example.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <AuthInput id='login-password' name='password' autocomplete='current-password' type='password' fieldName='Password' placeholder='••••••••' value={psw} onChange={(e) => setPsw(e.target.value)}/>
                
                <div className='w-[100%] h-fit mt-[.25rem] flex flex-row justify-between px-[1rem] items-center'>
                    <label className='!flex gap-[0.5rem] '>
                        <input 
                            type="checkbox"
                            className='m-0' 
                        />
                        <span className='font-medium text-sm leading-5'>Remember me</span>
                    </label>
                
                    <a href='' className='!no-underline font-semibold text-sm leading-5'>Forgot Password?</a>
                </div>
                <AuthSubmit>Submit</AuthSubmit>
            </form>
            
            
            <div className='w-[100%] h-fit py-[1.5rem] px-[1rem] '>
                <div className='w-full h-full flex flex-row align-items justify-center gap-[.25rem]'>
                <div className=' font-normal text-sm text-grey leading-5'>Don't have an account?</div>
                <a href="/signup" className='no-underline! font-semibold text-sm  leading-5 '>Sign Up for free.</a>
                </div>
            </div>

            </div>
        </div>
    )
}

export default LoginCard