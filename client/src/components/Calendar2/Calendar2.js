
import { useState } from 'react';
import "./style.css";

function Calendar2({ events = [], onEventClick }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getEventsForDay = (day) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
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

    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-empty-cell" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvents = getEventsForDay(day);
        days.push(
            <div key={day} className="calendar-day">
                <div className="calendar-day-number">{day}</div>

                <div className="calendar-events-list">
                    {dayEvents.map(event => (
                        <button
                            key={event.id}
                            onClick={() => onEventClick && onEventClick(event)}
                            className="calendar-event-btn"
                        >
                            {event.title}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h3 className="calendar-title">{monthYear}</h3>

                <div className="calendar-header-btns">
                    <button onClick={previousMonth} className="calendar-nav-btn">
                        <div className="w-5 h-5 text-gray-600">..</div>
                    </button>

                    <button onClick={nextMonth} className="calendar-nav-btn">
                        <div className="w-5 h-5 text-gray-600">..</div>
                    </button>
                </div>
            </div>

            <div className="calendar-grid">
                {daysOfWeek.map(day => (
                    <div key={day} className="calendar-weekday">
                        {day}
                    </div>
                ))}

                {days}
            </div>
        </div>
    );
}

export default Calendar2;