import React, { useState, useRef} from 'react'
import api from '@/lib/api'

const SnipeImage = () => {
    const[status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'done'>('idle');
    const [resultUrl, setResultUrl] = useState<string | null>(null);


    const handleSnipe = async (selectedFile: File) => {
        try {
            setStatus('uploading');
            const formData = new FormData();
            formData.append('file', selectedFile);

            const uploadRes = await api.post('/v1/upload_image', formData);
            const { temp_filename } = uploadRes.data;

            setStatus('processing');
            const processRes = await api.post('/v1/process_image', {
                filename: temp_filename
            });

            // remember to change this URL to a relative path for backend in deployment
            const fullUrl = `http://localhost:5000${processRes.data.processed_ur}`;
            setResultUrl(fullUrl);
            setStatus('done');
        } catch (error: any) {
            console.error('Snipe Error:', error);
            setStatus('idle');
        }
    };

    return (
        <div className='p-10 border-2 border-dashed border-gray-300 rounded-lg text-center'>
            {status === 'idle' && (
                <div onClick={() => document.getElementById('fileInput')?.click()} className='cursor-pointer'>
                    <p>Click or drag image</p>
                    <input 
                        type="file"
                        id='fileInput'
                        hidden
                        onChange={(e) => e.target.files && handleSnipe(e.target.files[0])}
                    />
                </div>
            )}

            {status === 'uploading' && <p>Uploading to flask...</p>}
            {status === 'processing' && <p>Snipe is running...</p>}

            {status === 'done' && resultUrl && (
                <div>
                    <img src={resultUrl} alt="Result" className='max-w-md mx-auto rounded'/>
                    <button
                        onClick={() => setStatus('idle')}
                        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
                    >
                        Upload Another
                    </button>
                </div>
            )}
        </div>
    );
}

export default SnipeImage