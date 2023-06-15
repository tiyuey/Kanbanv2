import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import instance from '../axios';

const TaskDetail = () => {
  const [task, setTask] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetchTask();
    fetchUsers();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await instance.get(`tasks/${id}`);
      const fetchedTask = response.data;
      setTask(fetchedTask);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await instance.get('users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await instance.delete(`tasks/${id}`);
      navigate('/tasks');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  const calculateStartDate = () => {
    if (task.startDate) {
      const formattedStartDate = new Date(task.startDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      return formattedStartDate;
    }
    return 'Not started';
  };

  const handleStartDateNull = async () => {
    const updatedTask = { ...task, startDate: null, status: "To Do" };
    try {
      await instance.put(`tasks/${id}`, updatedTask);
      setTask(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (!task) {
    return <div>Task not found...</div>;
  }

  const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const assignedUser = users.find((user) => user._id === task.assignedTo);
  const assignedToEmail = assignedUser ? assignedUser.email : 'Atama yapılmadı.';

  return (
    <div className="bg-white p-4 rounded-lg mx-auto w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">{task.title}</h2>
      <table className="w-full mb-4">
        <tbody>
          <tr>
            <td className="font-semibold">Description:</td>
            <td>{task.description}</td>
          </tr>
          <tr>
            <td className="font-semibold">Brand:</td>
            <td>{task.brand}</td>
          </tr>
          <tr>
            <td className="font-semibold">Assigned To:</td>
            <td>{assignedToEmail}</td>
          </tr>
          <tr>
            <td className="font-semibold">Due Date:</td>
            <td>{formattedDate}</td>
          </tr>
          <tr>
            <td className="font-semibold">Status:</td>
            <td>{task.status}</td>
          </tr>
          <tr>
            <td className="font-semibold">Start Date:</td>
            <td>{calculateStartDate()}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between">
      <Link to={`/edit-task/${id}`} className="bg-blue-500 text-white py-2 px-4 rounded">
        Edit
      </Link>
      <button onClick={handleStartDateNull} className="bg-gray-500 text-white py-2 px-4 rounded">
        Set as "Not Started"
      </button>
      <button onClick={toggleConfirmation} className="bg-red-500 text-white py-2 px-4 rounded">
        Delete
      </button>
    </div>
      {showConfirmation && (
        <div className="mt-4">
          <p>Are you sure you want to delete this task?</p>
          <div className="flex justify-end mt-2">
            <button onClick={toggleConfirmation} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded">
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
