'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const ProtectedRoute = ({children} : {children : React.ReactNode}) => {
    const router = useRouter();
    const [isGood, setIsGood] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('snipe_token');
        if (!token) {
            router.push('/login');
        } else {
            setIsGood(true);
        }
    },  [router]); 
    
    if (!isGood) return null;

    return (
        <>{children}</>
    )
}

export default ProtectedRoute