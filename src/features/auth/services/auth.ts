import type { User } from "@supabase/supabase-js";
import { AuthError, PostgrestError } from '@supabase/supabase-js';
import supabase from "../../../utils/supabase";
import type { Credentials } from "../types";

export const loadUser = async () => {
    try {
        const { data } = await supabase.auth.getUser();
        return data.user;
    } catch (error) {
        console.error("Authentication error:", error);
        throw error;
    }
}

export const signIn = async ({ email, password }: Credentials) => {
    try {
        const result = await supabase.auth.signInWithPassword({ email, password });
        if (result.error)
            throw result.error;
        return result;
    } catch (error) {
        console.error("Sign in error:", error);
        return {
            data: null as User | null,
            error: error as AuthError | PostgrestError | null
        };
    }
};

export const signOut = async () => {
    await supabase.auth.signOut();
};