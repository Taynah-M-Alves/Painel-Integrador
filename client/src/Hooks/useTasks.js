import { useState, useEffect } from "react";
import { getTasks } from "../Services/taskService";

export const useTasks = () => {
    const [tasks, setTasks] = useState([])
    

    useEffect(() => {
        const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return { tasks, setTasks };
};