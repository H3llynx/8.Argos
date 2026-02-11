import type { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import type { DateClickArg } from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import ErrorPitbull from "../../assets/images/error.png";
import { deleteData, fetchData } from '../../services/services';
import { useAdmin } from '../auth/hooks/useAdmin';
import "./Calendar.css";
import { AddEvent } from './components/AddEvent/AddEvent';
import { EditEvent } from './components/EditEvent/EditEvent';
import { EventCard } from './components/EventCard/EventCard';
import type { Event } from './types';
import { convertEvent } from './utils';

export function Calendar() {
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [newEventDate, setNewEventDate] = useState<string[]>([]);
    const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
    const isAdmin = useAdmin();

    useEffect(() => {
        const init = async () => {
            const { data, error } = await fetchData("events");
            if (error) setError(error.message ? error.message : "Error fetching data");
            else if (data) {
                setEvents(data);
            }
            setReload(false);
            setNewEventDate([]);
            setEventToEdit(null);
            setSelectedEvent(null)
        }
        init();
    }, [reload]);

    const handleViewEvent = (info: EventClickArg) => {
        if (eventToEdit) setEventToEdit(null);
        if (selectedEvent && selectedEvent.id === info.event.id) {
            setSelectedEvent(null);
        } else {
            if (newEventDate) setNewEventDate([]);
            setSelectedEvent(convertEvent(info.event));
        }
    }

    const handleAddEvent = (info: DateClickArg) => {
        if (!isAdmin) return;
        if (selectedEvent) setSelectedEvent(null);
        if (eventToEdit) setEventToEdit(null);
        const dateInfo = [`${info.dateStr}T00:00`, `${info.dateStr}T01:00`];
        if (newEventDate.length > 0 && newEventDate[0] === dateInfo[0]) setNewEventDate([]);
        else setNewEventDate(dateInfo);
    }

    const handleEditEvent = (event: Event) => {
        if (eventToEdit && eventToEdit.id === event.id) setEventToEdit(null);
        else setEventToEdit(event);
    }

    const handleDeleteEvent = async (event: Event) => {
        await deleteData(event.id, "events");
        setReload(true);
    }

    return (
        <>
            <div className="calendar-background" />
            <main className="main-calendar">
                <section className="calendar-container">
                    {error && <img src={ErrorPitbull} alt="Oops, something went wrong..." />}
                    {!error &&
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={events}
                            eventClick={handleViewEvent}
                            dateClick={handleAddEvent}
                            editable={true}
                            selectable={true}
                            height="auto"
                        />
                    }
                </section>
                <section className="flex flex-col bg-dark md:bg-transparent gap-1 w-screen md:max-w-lg items-center relative">
                    {selectedEvent &&
                        <EventCard
                            event={selectedEvent}
                            onEdit={handleEditEvent}
                            onDelete={handleDeleteEvent}
                        />
                    }
                    {newEventDate.length > 0 &&
                        <AddEvent
                            key={newEventDate[0]}
                            date={newEventDate!}
                            onSuccess={() => { setReload(true) }} />
                    }
                    {eventToEdit && <EditEvent
                        key={eventToEdit.id}
                        event={eventToEdit}
                        onSuccess={() => { setReload(true) }}
                    />}
                </section>
            </main>
        </>
    )
}