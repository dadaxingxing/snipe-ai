import React from 'react'

function SignupLayout({children} : {children: React.ReactNode}) {
  return (
    <div className='flex min-h-screen w-full items-center justify-center p-4 bg-grey-bg'>
        {children}
    </div>
  )
}

export default SignupLayout