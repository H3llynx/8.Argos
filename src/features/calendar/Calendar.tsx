import type { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import type { DateClickArg } from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import { fetchData } from '../../services/services';
import "./Calendar.css";
import { AddEvent } from './components/AddEvent/AddEvent';
import { EventCard } from './components/EventCard/EventCard';
import { convertEvent } from './services/events';
import type { Event } from './types';

export function Calendar() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string[]>([]);

    useEffect(() => {
        const init = async () => {
            const { data, error } = await fetchData("events");
            if (error) setError(error.message ? error.message : "Error fetching data");
            else if (data) {
                setEvents(data);
            }
            setLoading(false);
            setReload(false);
            setSelectedDate([]);
        }
        init();
    }, [reload]);

    useEffect(() => {
        if (isAdding) setSelectedEvent(null);
    }, [isAdding]);

    useEffect(() => {
        if (!isAdding) { setSelectedDate([]) }
    }, [isAdding])

    const handleViewEvent = (info: EventClickArg) => {
        if (selectedEvent && selectedEvent.id === info.event.id) setSelectedEvent(null);
        else {
            if (isAdding) setIsAdding(false);
            setSelectedEvent(convertEvent(info.event));
        }
    }

    const handleAddEvent = (info: DateClickArg) => {
        setIsAdding(true);
        setSelectedDate([`${info.dateStr}T00:00`, `${info.dateStr}T01:00`]);
    }

    return (
        <>
            <div className="calendar-background" />
            <main className="justify-center xl:justify-between w-full flex-wrap gap-2">
                <section className="calendar-container">
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
                </section>
                <section className="flex flex-col gap-1 w-full max-w-xl items-center">
                    {selectedEvent && <EventCard event={selectedEvent} />}
                    {isAdding && <AddEvent date={selectedDate!} onSuccess={() => { setReload(true) }} />}
                </section>
            </main>
        </>
    )
}