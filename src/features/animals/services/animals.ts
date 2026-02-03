import supabase from "../../../utils/supabase";

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