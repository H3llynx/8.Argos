import Error from "../../../assets/svg/error.svg?react";
import Paw from "../../../assets/svg/paw.svg?react";
import "./Input.css";
import type { InputProps } from "./types";

export function Input({ label, id, type, placeholder, ...props }: InputProps) {
    return (
        <label className="label" htmlFor={id}>
            <span>{label}:</span>
            <div className="input-container">
                <input
                    className="shadow-1"
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    {...props}
                />
                <Error aria-hidden="true" className="w-2 error-svg" />
                <Paw aria-hidden="true" className="paw w-1 valid-svg" />
            </div>
        </label>
    )

}