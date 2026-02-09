import { createClient } from '@supabase/supabase-js';
import type { Animal } from '../features/animals/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase

export type Database = {
    public: {
        Tables: {
            animals: {
                Row: Animal
            }
            events: {
                Row: Event
            }
        }
    }
};