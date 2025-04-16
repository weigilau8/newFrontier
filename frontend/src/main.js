import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterControl from './components/FilterControl';
import ErrorMsg from './components/ErrorMsg';
import LoadingOverlay from './components/LoadingOverlay';

const API_URL = 'http://localhost:5001';

function Main() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  // Fetch all tasks from the API
  const fetchAllTasks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/tasks`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new task
  const addNewTask = async (title, description) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add task');
      }
      
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle task completion status
  const toggleTaskStatus = async (id, completed) => {
    // Find task in the array
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return;
    
    // Optimistic update
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], completed };
    setTasks(updatedTasks);
    
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      // Rollback on failure
      setError(error.message);
      setTasks(tasks); // Restore original state
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    // Find task in the array
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return;
    
    // Optimistic update
    const originalTasks = [...tasks];
    setTasks(tasks.filter(task => task.id !== id));
    
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      // Rollback on failure
      setError(error.message);
      setTasks(originalTasks);
    }
  };

  // Filter tasks based on current filter
  const getFilteredTasks = () => {
    return tasks.filter(task => {
      if (filter === 'all') return true;
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
  };

  // Load all Task
  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      {isLoading && <LoadingOverlay />}
      
      <div class="container container mx-auto px-4 pt-10">
          <h1 className="text-3xl font-bold text-center text-slate-700 mb-10">The Task Manager App</h1>
          {error && <ErrorMsg msg={error} toClose={() => setError(null)} />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 container mx-auto px-4 py-8 bg-white md:rounded-xl shadow p-6 mb-6">
          <div className="max-lg:border-b-4 border-solid border-blue-700 mb-4">
              <TaskForm onAddTask={addNewTask} />
          </div>
          <div>
              <FilterControl
                currentFil={filter} 
                onFil={setFilter} 
              />
              
              <TaskList 
                tasks={getFilteredTasks()} 
                onToggleComplete={toggleTaskStatus}
                onDelete={deleteTask}
              />
          </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        
        
      </div>
    </div>
  );
}

export default Main;