import React, { useState, useRef} from 'react'
import api from '@/lib/api'

const SnipeImage = () => {
    const[status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'done'>('idle');
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer && e.dataTransfer.files[0]){
            handleSnipe(e.dataTransfer.files[0]);
        }
    };

    const handleDownload = async () => {
        if (!resultUrl) return;

        try {
            const response = await api.get(resultUrl, {
                responseType: 'blob', 
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.download = `snipe-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log('Download failed: ', error)
        }
    };

    const handleSnipe = async (selectedFile: File) => {
        try {
            setStatus('uploading');
            const formData = new FormData();
            formData.append('file', selectedFile);

            const uploadRes = await api.post('/api/v1/upload_image', formData);
            const { temp_filename } = uploadRes.data;

            setStatus('processing');
            const processRes = await api.post('/api/v1/process_image', {
                filename: temp_filename
            });

            // remember to change this URL to a relative path for backend in deployment
            const fullUrl = `http://localhost:5000${processRes.data.processed_url}`;
            setResultUrl(fullUrl);
            setStatus('done');
        } catch (error: any) {
            console.error('Snipe Error:', error);
            setStatus('idle');
        }
    };

    return (
        <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`p-10 border-2 border-dashed border-gray-300 rounded-lg text-center`}
        >
            {status === 'idle' && (
                <div onClick={() => document.getElementById('fileInput')?.click()} className='cursor-pointer'>
                    <p>{isDragging ? 'Drop to upload' : `Click or drag image`}</p>
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
                <div className='flex flex-col items-center gap-4'>
                    <img src={resultUrl} alt="Result" className='max-w-md mx-auto rounded'/>

                    <div className='flex gap-2'>
                        <button
                            onClick={() => setStatus('idle')}
                            className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
                        >
                            Upload Another
                        </button>

                        <button 
                            onClick={handleDownload}
                            className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'    
                        >
                            Download Result
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default SnipeImage