import React from 'react';

function FilterControl({ currentFil, onFil }) {
    return (
        <div className="flex justify-center gap-2 mb-6">
            <button  
                onClick={() => onFil('all')}
                className={`px-4 py-3 rounded font-medium transition duration-200 ${
                    currentFil === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
                All Tasks
            </button>
            <button 
                onClick={() => onFil('active')}
                className={`px-4 py-3 rounded font-medium transition duration-200 ${
                    currentFil === 'active' 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-200 hover:bg-yellow-300'
                }`}
            >
                Active Tasks
            </button>
            <button 
                onClick={() => onFil('completed')}
                className={`px-4 py-3 rounded font-medium transition duration-200 ${
                    currentFil === 'completed' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 hover:bg-green-300'
                }`}
            >
                Completed Tasks
            </button>
        </div>
    );
}

export default FilterControl;