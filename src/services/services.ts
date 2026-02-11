import type { Animal } from "../features/animals/types";
import type { Event } from "../features/calendar/types";
import type { Database } from "../utils/supabase";
import supabase from "../utils/supabase";

export type Tables = Database["public"]["Tables"]

export const fetchData = async <T extends keyof Tables>
    (table: T) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .select("*");
        return { data, error };
    } catch (err: unknown) {
        const error = err as Error;
        console.error(`${table} fetch error: ${error}`);
        return { data: null, error };
    }
};

export const deleteData = async <T extends keyof Tables>
    (id: string, table: T) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .delete()
            .eq("id", id)
        return { data, error };
    } catch (err: unknown) {
        const error = err as Error;
        console.error(`${table} update error: ${error} | id: ${id} not deleted`);
        return { data: null, error };
    }
};

export const addData = async <T extends keyof Tables>(newData: Animal | Event, table: T) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .insert(newData)
            .select()
            .single();
        return { data, error };
    } catch (err: unknown) {
        const error = err as Error;
        console.error(`${table} update error: ${error} | new ${typeof newData} could not be added`);
        return { data: null, error };
    }
}

export const updateData = async <T extends keyof Tables>(updatedData: Animal | Event, table: T) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .update(updatedData)
            .eq("id", updatedData.id)
            .select()
            .single();
        return { data, error };
    } catch (err: unknown) {
        const error = err as Error;
        console.error(`${table} update error: ${error} | id: ${updatedData.id} could not be updated`);
        return { data: null, error };
    }
};