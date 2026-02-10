export type Event = {
    id: string;
    event_type: string;
    title: string;
    start: string;
    end: string;
    status: "scheduled" | "updated" | "postponed"
    animal_id: string | null;
    visitor_name: string | null;
    visitor_email: string | null;
    visitor_phone: string | null;
    location: string | null;
    organizer: string | null;
    description: string | null;
    created_at: string;
    updated_at: string;
};