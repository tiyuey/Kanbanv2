import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './pages/login';
import Signup from './pages/signup';
import Logout from "./pages/logout";
import Navbar from "./pages/Navbar";
import Home from "./pages/home";
import Tasks from "./pages/tasks";
import CreateTask from "./pages/createtask";
import EditTask from "./pages/edittask";
import TaskDetail from "./pages/taskdetail";

function AppRouter() {
  return (
   <BrowserRouter>
   <Navbar />
     <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/logout" element={<Logout />} />
       <Route path="/tasks/:id" element={<TaskDetail />} />
       <Route path="/tasks" element={<Tasks />} />
       <Route path="/create-task" element={<CreateTask />} />
       <Route path="/edit-task/:id" element={<EditTask />} />
       <Route path="/" element={<Home />} />
     </Routes>
   </BrowserRouter>
  );
}

export default AppRouter;
