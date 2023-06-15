import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import instance from '../axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditTask = ({ props }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchUsers();
    fetchTask();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await instance.get('users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchTask = async () => {
    try {
      const response = await instance.get(`tasks/${id}`);
      const task = response.data;
      setTitle(task.title);
      setDescription(task.description);
      setBrand(task.brand);
      setAssignedTo(task.assignedTo);
      setDueDate(new Date(task.dueDate));
      setStatus(task.status);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await instance.put(`tasks/${id}`, {
        title,
        description,
        brand,
        assignedTo,
        dueDate,
        status,
      });
      setNotification({
        type: 'success',
        message: 'Task updated successfully!',
      });
    } catch (error) {
      console.error('Error updating task:', error);
      setNotification({
        type: 'error',
        message: 'Error updating task. Please try again.',
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl mb-6 text-gray-800">Edit Task</h2>
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
          <div className="mb-4">
            <label htmlFor="status" className="block text-lg text-gray-800 mb-2">
              Status:
            </label>
            <select
              id="status"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select a status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
