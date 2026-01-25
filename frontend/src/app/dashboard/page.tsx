'use client';
import api from '@/lib/api';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SnipeImage from '@/components/UI/SnipeImage';

const dashboard = () => {
    return (
        <ProtectedRoute>
            <SnipeImage></SnipeImage>
        </ProtectedRoute>
    )
}

export default dashboard