import React, { useEffect } from 'react';

function ErrorMsg({ msg, toClose }) {
    useEffect(() => {
    
        const timer = setTimeout(() => {
            toClose();
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [msg, toClose]);

    return (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4 flex justify-between items-center">
            <span>{msg}</span>
            <button onClick={toClose} className="text-red-800 font-bold">
                ×
            </button>
        </div>
    );
}

export default ErrorMsg;