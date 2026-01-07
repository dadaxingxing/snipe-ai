import React from 'react'

export default function AuthSubmit(
    {children}: {
        children: React.ReactNode;
    }
){
    return (
        <div className='w-[100%] h-fit pt-[.5rem]'>
            <button
                type='submit' 
                className='w-full h-[3rem] gap-[0.5rem] border border-solid !rounded-lg flex justify-center items-center bg-blue-bg appearance-none cursor-pointer '
            >
                <span className=' font-semibold text-base text-white '>
                    {children}
                </span>
            </button>
        </div>
    );
}
