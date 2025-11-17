import { useState, useEffect } from "react";
import { getHistoryByTask } from "../Services/HistoryService";
import { useParams } from "react-router-dom";

export const useHistoryByTask = (taskId) => {
    const [history, setHistory] = useState(null);


    const fetchHistoryByTask = async () => {
        const data = await getHistoryByTask(taskId);
        setHistory(data)
    };

    useEffect(() => {
        if (!taskId) {
            setHistory(null); // limpa quando não há tarefa
            return;
        }

        fetchHistoryByTask();
    }, [taskId])

    return { history, fetchHistoryByTask };
};