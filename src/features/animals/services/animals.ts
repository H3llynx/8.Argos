import supabase from "../../../utils/supabase";
import type { Animal } from "../types";

export const fetchAnimals = async () => {
    try {
        const { data, error } = await supabase
            .from("animals")
            .select("*");
        return { data, error };
    } catch (err: unknown) {
        const error = err as Error;
        console.error("Animals fetch error:", error);
        return { data: null, error };
    }
}

export const updateAnimal = async (updatedAnimal: Animal) => {
    try {
        const { data, error } = await supabase
            .from("animals")
            .update(updatedAnimal)
            .eq("id", updatedAnimal.id)
            .select()
            .single();
        return { data, error };
    } catch (err: unknown) {
        const error = err as Error;
        console.error("Animal update error:", error);
        return { data: null, error };
    }
}

export const deleteAnimal = async (id: string) => {
    try {
        const { data, error } = await supabase
            .from("animals")
            .delete()
            .eq("id", id)
        return { data, error };
    } catch (err: unknown) {
        const error = err as Error;
        console.error("Animal delete error:", error);
        return { data: null, error };
    }
}

export const addAnimal = async (newAnimal: Animal) => {
    try {
        const { data, error } = await supabase
            .from("animals")
            .insert(newAnimal)
            .select()
            .single();
        return { data, error };
    } catch (err: unknown) {
        const error = err as Error;
        console.error("Animal creation error:", error);
        return { data: null, error };
    }
}