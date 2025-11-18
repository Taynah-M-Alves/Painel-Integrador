import { useState } from 'react';
import "./style.css";
import EventDetailsModal from '../EventDetailsModal';

function Calendar2({ events = [], onEventClick }) {

    const [showEventModal, setShowEventModal] = useState(false);

    const [selectedEventId, setSelectedEventId] = useState(null);

    const handleOpenEventModal = () => setShowEventModal(true);
    const handleCloseEventModal = () => setShowEventModal(false);

    const [currentDate, setCurrentDate] = useState(new Date());

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getEventsForDay = (day) => {
        return events?.filter(event => {
            const [year, month, dayStr] = event.Prazo.split('-');

            const eventDate = new Date(
                Number(year),
                Number(month) - 1,  // meses começam em 0
                Number(dayStr)
            );

            return (
                eventDate.getDate() === day &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear()
            );
        });
    };


    const monthYear = currentDate.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
    });

    const days = [];

    // empty cells from previous month
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // actual days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvents = getEventsForDay(day);

        days.push(
            <div key={day} className="calendar-day filled">
                <div className="day-number">{day}</div>

                <div className="events-container">
                    {dayEvents.map(event => (
                        <div
                            key={event.id}
                            className="event-pill"
                            onClick={() => {
                                setSelectedEventId(event.id);
                                handleOpenEventModal();
                            }}
                        >
                            {event.Titulo}
                        </div>
                    ))}

                </div>
            </div>
        );
    }

    return (
        <div className="calendar-wrapper">

            <EventDetailsModal
                handleClose={handleCloseEventModal}
                show={showEventModal}
                selectedEventId={selectedEventId}
            />

            <div className="calendar-header">
                <button onClick={previousMonth} className="nav-btn">◀</button>

                <h3 className="calendar-title">{monthYear}</h3>

                <button onClick={nextMonth} className="nav-btn">▶</button>
            </div>

            <div className="calendar-grid">
                {daysOfWeek.map(day => (
                    <div key={day} className="weekday">
                        {day}
                    </div>
                ))}

                {days}
            </div>
        </div>
    );
}

export default Calendar2;
