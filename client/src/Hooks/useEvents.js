import { useState, useEffect } from "react";
import { getEvents } from '../Services/EventService';

export const useEvents = () => {
    const [events, setEvents] = useState([])

    const fetchEvents = async () => {
        const data = await getEvents();
        setEvents(data);
    };
    useEffect(() => {
        fetchEvents();
    }, []);

    return { events, fetchEvents };
};