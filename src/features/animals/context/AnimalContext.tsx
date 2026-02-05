import { createContext } from 'react';
import type { AnimalContextType } from '../types';

export const AnimalContext = createContext<AnimalContextType | null>(null);