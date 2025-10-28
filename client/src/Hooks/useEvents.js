import { useState, useEffect } from "react";
import { getEvents } from '../Services/EventService';

export const useEvents = () => {
    const [events, setEvents] = useState([])


    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEvents();
            setEvents(data);
        };

        fetchEvents();
    }, []);

    return { events, setEvents };
};