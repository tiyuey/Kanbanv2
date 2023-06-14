import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/v2/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        await axios.post('http://localhost:5001/v2/tasks', {
          title,
          description,
          brand,
          assignedTo,
          dueDate,
        });
        setNotification({
          type: 'success',
          message: 'Task created successfully!',
        });
        setTitle('');
        setDescription('');
        setBrand('');
        setAssignedTo('');
        setDueDate(new Date());
      } catch (error) {
        console.error('Error creating task:', error);
        setNotification({
          type: 'error',
          message: 'Error creating task. Please try again.',
        });
      }
    };
    useEffect(() => {
      const interceptor = axios.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
  
      return () => {
        axios.interceptors.request.eject(interceptor);
      };
    }, []);
  

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl mb-6 text-gray-800">Create a Task</h2>
            {notification && (
              <div className={`mb-4 p-2 rounded ${notification.type === 'success' ? 'bg-green-200' : 'bg-red-200'}`}>
                {notification.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg text-gray-800 mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-lg text-gray-800 mb-2">
              Description:
            </label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="brand" className="block text-lg text-gray-800 mb-2">
              Brand:
            </label>
            <select
              id="brand"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            >
              <option value="">Select a brand</option>
              <option value="Hexaworks">Hexaworks</option>
              <option value="Babil">Babil</option>
              <option value="Babil Kitap">Babil Kitap</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="assignedTo" className="block text-lg text-gray-800 mb-2">
              Assigned To:
            </label>
            <select
              id="assignedTo"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            >
              <option value="">Select an option</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-lg text-gray-800 mb-2">
              Due Date:
            </label>
            <DatePicker
              id="dueDate"
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
