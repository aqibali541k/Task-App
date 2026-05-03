import React, { useEffect, useState } from 'react'
import { FaFilter, FaPlus } from 'react-icons/fa'
import Tabs from './Tabs'
import { message } from 'antd'
import axios from 'axios'
let initialState = {
    task: "",
    priority: "medium"
}
const Home = () => {
    const [currentProgress, setCurrentProgress] = useState(0)
    const [task, setTask] = useState(initialState)
    const [tasks, setTasks] = useState([])
    const [hover, setHover] = useState(false)
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.task) {
            message.error("Please enter a task")
            return;
        }
        try {
            const res = await axios.post("http://localhost:8000/todo/create", task)
            console.log(res.data);
            fetchTask();
            message.success("Task created successfully")
        }
        catch (error) {
            console.log(error.message);
            message.error("Failed to create task")
        }
        setTask(initialState);
    }
    const fetchTask = async () => {
        try {
            const res = await axios.get("http://localhost:8000/todo/read")
            setTasks(res.data.todos)
        }
        catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        if (tasks.length === 0) {
            setCurrentProgress(0)
        }
        else {
            const completedTasks = tasks.filter((task) => task.completed).length;
            const totalTasks = tasks.length;
            const progress = Math.round((completedTasks / totalTasks) * 100);
            setCurrentProgress(progress)
        }
    }, [tasks])
    useEffect(() => {
        fetchTask()
    }, [])
    return (
        <div className='max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-12 font-bold text-center bg-linear-to-r from-purple-600 via-blue-600 to-pink-500 bg-clip-text text-transparent'>
                Smart Productivity Dashboard
            </h1>

            <p className='text-center text-md mt-2'>
                Organize your tasks with intelligence and style
            </p>

            <div className="flex justify-center  mt-8 bg-white rounded-4xl overflow-hidden shadow-lg border border-gray-200">
                <div className="w-full max-w-5xl bg-white py-7 px-8 ">

                    {/* Progress Bar Container */}
                    <div className="flex justify-between  mb-2">

                        <p className='text-sm  text-gray-600 font-semibold'>
                            Overall Progress
                        </p>
                        <p className='text-sm  bg-linear-to-r from-purple-600 via-blue-600 to-pink-500 bg-clip-text text-transparent font-bold'>
                            {currentProgress + "%"}
                        </p>
                    </div>
                    <div className='relative  h-2 sm:h-3 rounded-2xl bg-gray-600/10'>

                        {/* Progress Fill */}
                        <div
                            style={{ width: currentProgress + "%" }}
                            className="absolute  top-0 left-0 h-3 bg-linear-to-r from-purple-600 via-blue-600 to-pink-500 rounded-2xl transition-all duration-500"
                        >
                        </div>

                    </div>

                </div>
            </div><div className="mt-8 bg-white shadow-lg rounded-3xl py-6 px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                    {/* Input */}
                    <input
                        value={task.task}
                        name='task'
                        onChange={handleChange}
                        placeholder='Add Task'
                        className='border border-gray-300 w-full sm:flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-xl outline-none focus:border-pink-400 focus:ring-1'
                    />

                    {/* Select */}
                    <select
                        value={task.priority}
                        name="priority"
                        onChange={handleChange}
                        className='border border-gray-300 w-full sm:w-40 py-2 sm:py-3 px-3 sm:px-4 rounded-xl cursor-pointer'
                    >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>

                    {/* Button */}
                    <button
                        onClick={handleSubmit}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className="flex items-center justify-center cursor-pointer gap-2 w-full sm:w-44 bg-linear-to-r from-purple-600 via-blue-600 to-pink-500 text-white rounded-xl py-2 sm:py-3 transition-all duration-300"
                    >
                        <FaPlus className={`${hover ? 'rotate-90' : ''} transition-transform`} />
                        Add Task
                    </button>

                </div>
            </div>
            <div className="relative mt-10">
                <Tabs tasks={tasks} setTasks={setTasks} />
            </div>
        </div>
    )
}

export default Home