import { useState, useEffect } from "react";
import { getHistoryByTask } from "../Services/HistoryService";

export const useHistoryByTask = (taskId) => {
    const [history, setHistory] = useState(null);


    const fetchHistoryByTask = async () => {
        const data = await getHistoryByTask(taskId);
        setHistory(data)
    };

    useEffect(() => {
        if (!taskId) {
            setHistory(null);
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchHistoryByTask();
    }, [taskId])

    return { history, fetchHistoryByTask };
};