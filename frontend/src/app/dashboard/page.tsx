'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from '@/lib/api';

const dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('snipe_token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);
        
    return (
        <div>you have a token in your dashboard!!!</div>
    )
}

export default dashboard