import { useState, useEffect } from "react";
import { getTasksByGroup } from "../Services/taskService";
import { useParams } from "react-router-dom";

export const useTasksByGroup = () => {
    const [tasks, setTasks] = useState([""])
    const { id } = useParams();


    const fetchTasksByGroup = async () => {
        const data = await getTasksByGroup(id);
        setTasks(data)
    };

    useEffect(() => {
        fetchTasksByGroup();
    }, [id]);



    return { tasks, fetchTasksByGroup };
};