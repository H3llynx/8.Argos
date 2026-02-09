import supabase from "../../../utils/supabase";
import type { Animal } from "../types";

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