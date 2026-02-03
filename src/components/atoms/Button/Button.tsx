import "./Button.css";
import type { ButtonProps } from "./types";

export function Button({ children }: ButtonProps) {
    return (
        <button className="cta shadow-1">
            {children}
        </button>
    )
}