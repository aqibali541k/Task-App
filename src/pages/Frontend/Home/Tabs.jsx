import { Checkbox, message } from "antd";
import React, { useEffect, useState } from "react";
import { FaEdit, FaFilter, FaTasks, FaTrash } from "react-icons/fa";
import { CheckOutlined } from "@ant-design/icons"
import axios from "axios";
import { useAuthContext } from "../../../config/AuthContext";

const Tabs = ({ tasks, setTasks }) => {
    const { isAuth } = useAuthContext();
    const [activeTab, setActiveTab] = useState("all");

    const handleCompleted = async (_id) => {
        if (!isAuth) {
            const guestTasks = JSON.parse(localStorage.getItem("guestTasks")) || [];
            const updatedTasks = guestTasks.map(task => task._id === _id ? { ...task, completed: !task.completed } : task);
            localStorage.setItem("guestTasks", JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
            return;
        }
        setTasks(prevTasks => prevTasks.map(task => task._id === _id ? { ...task, completed: !task.completed } : task))
    }
    const handleDelete = async (_id) => {
        if (!isAuth) {
            const guestTasks = JSON.parse(localStorage.getItem("guestTasks")) || [];
            const updatedTasks = guestTasks.filter(task => task._id !== _id);
            localStorage.setItem("guestTasks", JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
            message.success("Task deleted successfully (Guest)");
            return;
        }

        try {
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"}/todo/delete/${_id}`)
            message.success("Task deleted successfully")
        }
        catch (error) {
            console.log(error.message);
            message.error("Failed to delete task")
        }
        setTasks(prevTasks => prevTasks.filter(task => task._id !== _id))
    }
    const filteredTasks = tasks.filter((task) => {
        if (activeTab === "all") return true;
        if (activeTab === "pending") return !task.completed;
        if (activeTab === "completed") return task.completed;
        return true;
    });

    return (
        <div className="mt-10">

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-4 pb-2">
                <p className='flex items-center gap-2'><FaFilter className='text-gray-500' />Filter :</p>
                <button onClick={() => setActiveTab("all")}
                    className={activeTab === "all" ? "bg-linear-to-r from-purple-500 to-blue-500 cursor-pointer text-white py-1.5 text-sm font-medium px-4 rounded-2xl" : "bg-white py-1.5 text-sm font-medium px-4 cursor-pointer rounded-2xl"}>
                    All
                </button>

                <button onClick={() => setActiveTab("pending")}
                    className={activeTab === "pending" ? "bg-linear-to-r from-purple-500 to-blue-500 cursor-pointer text-white py-1.5 text-sm font-medium px-4 rounded-2xl transition-all ease-in-out duration-300" : "bg-white text-sm font-medium py-1.5 px-4 cursor-pointer rounded-2xl transition-all ease-in-out duration-300"}>
                    Pending
                </button>

                <button onClick={() => setActiveTab("completed")}
                    className={activeTab === "completed" ? "bg-linear-to-r from-purple-500 to-blue-500 cursor-pointer text-white py-1.5 text-sm font-medium px-4 rounded-2xl transition-all ease-in-out duration-300" : "bg-white text-sm font-medium py-1.5 px-4 cursor-pointer rounded-2xl transition-all ease-in-out duration-300"}>
                    Completed
                </button>
            </div>

            {/* Tasks */}
            <div className="mt-6 space-y-3">
                {filteredTasks.length === 0 && (
                    <div className="w-full h-80 flex flex-col justify-center items-center bg-white rounded-xl shadow-md text-gray-500 gap-2">

                        <FaTasks className="text-purple-500 text-8xl! p-4! bg-purple-100! rounded-full!" />

                        <p className="text-2xl text-black font-bold">
                            No tasks yet!
                        </p>

                        <p className="text-lg text-gray-400">
                            No pending tasks found
                        </p>

                    </div>
                )}
                {filteredTasks.map((task) => (
                    <div key={task._id}
                        className="py-6 shadow-lg px-6 bg-white rounded-2xl flex justify-between items-center gap-4">
                        <span className="flex items-center text-medium font-bold gap-4 cursor-pointer flex-1 min-w-0" >
                            <span onClick={() => handleCompleted(task._id)} className={`h-6 w-6 shrink-0 ${task.completed ? "bg-linear-to-r from-purple-500 to-blue-500 text-white! border-0!" : "border-gray-400"} rounded-lg border-2 flex justify-center items-center hover:border-purple-500 border-gray-400`}>
                                {task.completed ? <CheckOutlined className=" cursor-pointer!" /> : null}
                            </span>
                            <span className="truncate" title={task.task}>{task.task}</span>
                        </span>

                        <div className="flex items-center gap-4 shrink-0">
                            <span className={task.priority === "high" ? "bg-linear-to-r from-red-500 to-pink-500 text-white font-semibold text-xs! uppercase px-4 py-1 rounded-full" : task.priority === "medium" ? "bg-linear-to-r from-yellow-500 to-orange-500 text-white font-semibold text-xs! uppercase px-4 py-1 rounded-full" : "bg-linear-to-r from-green-500 to-blue-500 text-white font-semibold uppercase text-xs! px-4 py-1 rounded-full"}>
                                {task.priority}
                            </span>
                            <div className="flex gap-3 text-gray-500 text-lg">
                                {/* <span className="cursor-pointer hover:text-blue-500 transition-colors" onClick={handleUpdate}><FaEdit className="text-blue-600!" /></span> */}
                                <span className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleDelete(task._id)}><FaTrash className="text-red-600!" /></span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex justify-between mt-8 bg-white rounded-4xl py-4 px-6 overflow-hidden shadow-lg border border-gray-200">
                    <p className="text-sm flex flex-col items-center">
                        <span className='text-purple-500 font-bold text-2xl mb-1'>
                            {tasks.length}
                        </span>
                        Total Tasks
                    </p>
                    <div className=' flex justify-center items-center h-10 mt-2 w-0.5 bg-gray-200' ></div>
                    <p className="text-sm flex flex-col items-center"><span className='text-green-500 font-bold text-2xl mb-1'> {tasks.filter((task) => task.completed).length} </span> Completed</p>
                    <div className=' flex justify-center items-center h-10 mt-2 w-0.5 bg-gray-200' ></div>
                    <p className="text-sm flex flex-col items-center"><span className='text-red-500 font-bold text-2xl mb-1'> {tasks.filter((task) => !task.completed).length} </span> Pending</p>
                </div>
            </div>

        </div>
    );
};

export default Tabs;