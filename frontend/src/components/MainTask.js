import React from 'react';
import { CheckCircleIcon, ArrowUturnLeftIcon ,TrashIcon } from '@heroicons/react/24/solid'

function MainTask({ task, onToggleComplete, onDelete }) {
    const { id, title, description, completed } = task;
    
    return (
        <li className={`bg-white rounded-lg shadow p-4 flex justify-between items-start ${completed ? 'bg-slate-200' : '' }`}>
            <div className="flex-1">
                <h3 className={`text-lg font-semibold ${completed ? 'line-through text-gray-500' : ''}`}>
                    {title}
                </h3>
                <p className={`text-gray-600 mt-1 ${completed ? 'line-through text-gray-500' : ''}`}>
                    {description}
                </p>
            </div>
            <div className="flex space-x-2 ml-4">
                {completed ? (
                    <button 
                        onClick={() => onToggleComplete(id, false)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded text-sm transition duration-200"
                    >
                        <ArrowUturnLeftIcon className="size-4 text-white-500" />
                    </button>
                ) : (
                    <button 
                        onClick={() => onToggleComplete(id, true)}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded text-sm transition duration-200"
                    >
                        <CheckCircleIcon className="size-4 text-white-500" />
                    </button>
                )}
                <button 
                onClick={() => onDelete(id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded text-sm transition duration-200"
                >
                    <TrashIcon className="size-4 text-white-500" />
                </button>
            </div>
        </li>
    );
}

export default MainTask;