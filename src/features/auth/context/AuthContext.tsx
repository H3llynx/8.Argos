import type { User } from '@supabase/supabase-js';
import { createContext } from 'react';

export type AuthContextType = {
    user: User | null;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);