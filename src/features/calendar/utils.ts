import type { EventApi } from "@fullcalendar/core/index.js";
import type { Event } from "./types";

export const dbDateToDateTimeLocal = (date: string) => {
    if (!date) return "";
    return date.slice(0, 16);
};

export const dateTimeLocalToDb = (date: string) => {
    if (!date) return "";
    return new Date(date).toISOString();
};

export const convertEvent = (event: EventApi): Event => {
    const convertedEvent = {
        id: event.id,
        title: event.title,
        start: event.startStr,
        end: event.endStr,
        ...event.extendedProps
    } as Event
    return convertedEvent
}