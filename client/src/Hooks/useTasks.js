import { useState, useEffect } from "react";
import { getTasks } from "../Services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([])



  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  return { tasks, fetchTasks };
};