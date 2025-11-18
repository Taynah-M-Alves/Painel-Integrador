import { useState, useEffect } from "react";
import { getEventsById } from '../Services/EventService';

export const useEventsById = (selectedEventId) => {
    const [events, setEvents] = useState([])

    const fetchEventsById = async () => {
        const data = await getEventsById(selectedEventId);
        setEvents(data);
    };
    useEffect(() => {
        fetchEventsById();
    }, [selectedEventId]);

    return { events, fetchEventsById };
};