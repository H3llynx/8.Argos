import type { EventApi } from "@fullcalendar/core/index.js";
import supabase from "../../../utils/supabase";
import type { Event } from "../types";

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

export const updateEvent = async (updatedEvent: Event) => {
    try {
        const { data, error } = await supabase
            .from("events")
            .update(updatedEvent)
            .eq("id", updatedEvent.id)
            .select()
            .single();
        return { data, error };
    } catch (err: unknown) {
        const error = err as Error;
        console.error("Event update error:", error);
        return { data: null, error };
    }
}

export const addEvent = async (newEvent: Event) => {
    try {
        const { data, error } = await supabase
            .from("events")
            .insert(newEvent)
            .select()
            .single();
        return { data, error };
    } catch (err: unknown) {
        const error = err as Error;
        console.error("Event creation error:", error);
        return { data: null, error };
    }
}