import { createContext } from "react";
import type { AnimalTableType } from "../types";

export const AnimalTableContext = createContext<AnimalTableType | null>(null);