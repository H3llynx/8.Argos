import type { Database } from "../utils/supabase";
import supabase from "../utils/supabase";

type Tables = Database["public"]["Tables"]

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