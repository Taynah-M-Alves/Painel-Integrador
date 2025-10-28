import './style.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useEvents } from '../../Hooks/useEvents';

const Calendar = () => {

    const { events } = useEvents();

    console.log("events", events)


    const formattedEvents = events?.map(ev => ({
        title: ev.Titulo,
        date: ev.Prazo, // precisa estar em formato ISO se quiser mostrar corretamente
    })) || [];

    console.log("formatado", formattedEvents)


    return (

        <div className="calendar-container" style={{ margin: '20px' }}>
            {/* {events?.map((event, index) => (
                <div key={index}>
                    <h1>{event.Titulo}</h1>
                </div>

            ))} */}

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                listDaySideFormat
                headerToolbar={{
                    left: 'dayGridMonth,listWeek',
                    center: 'title',
                    right: 'prev,next',
                }}
                events={formattedEvents}
            />
        </div>
    );
};

export default Calendar;
