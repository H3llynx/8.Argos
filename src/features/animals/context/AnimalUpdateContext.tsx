import { createContext } from 'react';
import type { AnimalUpdateType } from '../types';

export const AnimalUpdateContext = createContext<AnimalUpdateType | null>(null);