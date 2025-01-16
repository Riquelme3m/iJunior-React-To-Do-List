import React, { useState, useEffect } from "react";
import todoIcon from "../assets/todo_icon.png";
import deleteIcon from "../assets/delete.png";
import tickIcon from "../assets/tick.png";
import notTickIcon from "../assets/not_tick.png";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Load tasks from localStorage when the component is mounted
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  function handleInputChange(event) {
    setTaskInput(event.target.value);
  }

  function addTask() {
    if (taskInput.trim() !== "") {
      const newTask = { text: taskInput, completed: false };
      setTasks([...tasks, newTask]);
      setTaskInput("");
    }
  }

  function toggleCompletion(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  function deleteTask(index) {
    // Remove the task from the state
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    // Update the tasks in localStorage after removal
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[70vh] rounded-xl gap-7">
      {/* -----------title----------*/}
      <div className="flex justify-start gap-4 align-baseline mt-5">
        <img src={todoIcon} alt="To do list icon" className="w-8" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>
      <div className="flex justify-start p-0 w-[100%] relative ">
        <input
          type="text"
          name="search"
          id="task-search"
          placeholder="Add your task"
          value={taskInput}
          onChange={handleInputChange}
          className="bg-stone-200 rounded-3xl h-13 w-[95%] p-3 border-none focus:outline-none"
        />
        <button onClick={addTask} className="min-h-[3rem] bg-orange-500 text-center w-[7rem] rounded-3xl absolute right-1 text-white">
          ADD +
        </button>
      </div>
      <div>
        {/* Task List */}
        <div className="flex flex-col gap-4">
          {tasks.map((task, index) => (
            <div key={index} className="flex justify-between items-center">
              {/* Toggle Task Completion */}
              <button onClick={() => toggleCompletion(index)}>
                <img src={task.completed ? tickIcon : notTickIcon} alt="tick icon" className="w-8" />
              </button>

              {/* Task Text with Line-through if Completed */}
              <span className={`flex-1 ml-3 ${task.completed ? "line-through" : ""}`}>
                {task.text}
              </span>

              {/* Delete Task */}
              <button onClick={() => deleteTask(index)}>
                <img src={deleteIcon} alt="delete icon" className="w-8" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
