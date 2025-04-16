import React from 'react';
import MainTask from './MainTask';

function TaskList({ tasks, onToggleComplete, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-center text-gray-500">
        No tasks found
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map(task => (
        <MainTask 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;