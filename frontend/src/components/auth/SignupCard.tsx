'use client';
import React, {useState} from 'react';
import AuthInput from '../UI/AuthInput';
import AuthSubmit from '../UI/AuthSubmit';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

function SignupCard() {
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');  
  const [confirmPsw, setConfirmpsw] = useState('');

  const router = useRouter();
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (psw !== confirmPsw) {
      alert('Passwords do not match!');
      return
    };
    const payload = {
        email: email,
        password: psw
    };
    try {
      const response = await api.post('/auth/register', payload);
      console.log('Successful!', response.data.message);
      router.push('/login');
    } catch (error: any) {
        console.error('Register failed: ', error.response?.data || error.message)
    }
  };

  return (
    <div className='w-[26.25rem] h-fit flex flex-col rounded-xl bg-white'>
        <div className='w-[100%] h-fit flex flex-col justify-center items-center '>
          
          <div className='w-[100%] h-fit gap-[10px] flex flex-col items-center px-[1.5rem] pt-[2rem] pb-[1rem]'>
            <div>
              <div className='w-fit h-fit  text-xl font-bold tracking-1 leading-[1.75rem] '>Snipe AI</div>
            </div>
            <div className=' text-2xl tracking-1 font-bold leading-[1.75rem] align-middle'>Create your account</div>
            <div className=' text-sm font-regular leading-[1.25rem] pt-[0.5rem] text-grey'>Sign up today and get 3 free credit</div>
          </div>

          <form onSubmit={handleSubmitForm} className='py-[0.5rem] px-[1.5rem] gap-[1rem] w-[100%] h-fit flex flex-col'>
            <AuthInput id="signup-email" name="email" autocomplete="email" fieldName='Email Address' placeholder='name@example.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <AuthInput id="new-password" name="password" autocomplete="new-password" fieldName='Password' placeholder='••••••••' type='password' value={psw} onChange={(e) => setPsw(e.target.value)}/>
            <AuthInput id="confirm-password" name="confirm-password" autocomplete="new-password" fieldName='Confirm Password' placeholder='••••••••' type='password' value={confirmPsw} onChange={(e) => setConfirmpsw(e.target.value)}/>
            <AuthSubmit>Submit</AuthSubmit>
          </form>

          <div className='w-[100%] h-fit py-[1.5rem] px-[1rem] '>
            <div className='w-full h-full flex flex-row align-items justify-center gap-[.25rem]'>
              <div className=' font-normal text-sm text-grey leading-5'>Already have an account?  </div>
              <a href="/login" className='!no-underline font-semibold text-sm  leading-5 '>Log In.</a>
            </div>
          </div>

        </div>
    </div>
  )
}

export default SignupCard
