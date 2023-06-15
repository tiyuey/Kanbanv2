import React, { useEffect, useState } from "react";
import instance from '../axios';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link, useParams, useNavigate } from "react-router-dom";
import TaskDetail from "./taskdetail";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await instance.get("tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
  
    if (!destination) return;
  
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
  
    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.find((task) => task._id === result.draggableId);
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);
  
    const updatedTask = { ...movedTask, status: destination.droppableId };
  
    if (destination.droppableId === 'In Progress' && !movedTask.startDate) {
      updatedTask.startDate = new Date();
    }
    
    try {
      await instance.put(`tasks/${updatedTask._id}`, updatedTask);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  
    await fetchTasks();
  };
  

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    navigate(`/tasks/${task._id}`);
  };

  const closeTaskDetail = () => {
    setSelectedTask(null);
  };

  const brands = [...new Set(tasks.map((task) => task.brand))];

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const filteredTasks = selectedBrand ? tasks.filter((task) => task.brand === selectedBrand) : tasks;

  const columns = {
    "To Do": {
      label: "To Do",
      tasks: filteredTasks.filter((task) => task.status === "To Do"),
    },
    "In Progress": {
      label: "In Progress",
      tasks: filteredTasks.filter((task) => task.status === "In Progress"),
    },
    "Complete": {
      label: "Complete",
      tasks: filteredTasks.filter((task) => task.status === "Complete"),
    },
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex space-x-8">
        {brands.map((brand) => (
          <button
            key={brand}
            className={`${
              selectedBrand === brand ? "bg-gray-700 font-bold text-white" : "bg-gray-200 text-white-700"
            } rounded-md py-2 px-4`}
            onClick={() => handleBrandChange(brand)}
          >
            {brand}
          </button>
        ))}
      </div>
      {selectedTask ? (
        <TaskDetail task={selectedTask} onClose={closeTaskDetail} />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex mt-8">
            {Object.entries(columns).map(([status, column]) => (
              <div key={status} className="flex flex-col items-center mr-8">
                <h2 className="text-xl font-bold mb-4">{column.label}</h2>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-gray-300 rounded-lg p-4 w-80"
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="bg-gray-600 p-2 text-white rounded-md mb-2"
                              onClick={() => handleTaskClick(task)}
                            >
                              {task.title}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default TaskPage;
