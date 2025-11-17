import './style.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useEvents } from '../../Hooks/useEvents';
import allLocales from '@fullcalendar/core/locales-all';
import EventDetailsModal from '../EventDetailsModal';
import { useState } from 'react';

const Calendar = ({ events }) => {

    const [showEventModal, setShowEventModal] = useState(false);

    const [selectedEventId, setSelectedEventId] = useState(null);

    const handleOpenEventModal = () => setShowEventModal(true);
    const handleCloseEventModal = () => setShowEventModal(false);

    const openEvent = (selected) => {
        setSelectedEventId(selected.event.id);
        handleOpenEventModal();
    }

    const formattedEvents = events?.map(ev => ({
        id: ev.id,
        title: ev.Titulo,
        date: ev.Prazo,
    })) || [];



    return (

        <div className="calendar-container" style={{ margin: '20px' }}>

            <EventDetailsModal
                handleClose={handleCloseEventModal}
                show={showEventModal}
                selectedEventId={selectedEventId}
            />


            <FullCalendar
                plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locales={allLocales}
                locale="pt-br"
                listDaySideFormat={false}
                eventDisplay={"list-item"}

                headerToolbar={{
                    left: 'dayGridMonth,listMonth',
                    center: 'title',
                    right: 'prev,next',
                }}
                events={formattedEvents}
                eventClick={openEvent}
            />
        </div>
    );
};

export default Calendar;
