
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
    return (
        <div className="calendar-container" style={{ margin: '20px' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,listWeek',
                }}
                events={[
                    { title: 'Reunião', date: '2025-10-23' },
                    { title: 'Entrega de projeto', date: '2025-10-27' },
                ]}
            />
        </div>
    );
};

export default Calendar;
