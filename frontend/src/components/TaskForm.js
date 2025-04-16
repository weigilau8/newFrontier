import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    
    if (!trimmedTitle || !trimmedDescription) {
      return;
    }
    
    onAddTask(trimmedTitle, trimmedDescription);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="lg:p-4 mb-6">
      <div className="mb-4">
        <label htmlFor="taskTitle" className="block font-medium mb-2">Task Title</label>
        <input 
          type="text" 
          id="taskTitle" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="taskDescription" className="block font-medium mb-2">Task Description</label>
        <textarea 
          id="taskDescription" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h- resize-y"
        />
      </div>
      <button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded transition duration-200 w-full"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;

