import { tv } from "tailwind-variants";
import Error from "../../../assets/svg/error.svg?react";
import Paw from "../../../assets/svg/paw.svg?react";
import "./Input.css";

export type InputProps = {
    variant?: "default" | "checkbox" | "filter"
    label?: string;
    required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>

const labelVariants = tv({
    base: "label",
    variants: {
        variant: {
            default: "flex flex-col",
            checkbox: "flex flex-row font-bold cursor-pointer",
            filter: "filter-area"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});

export function Input({ variant = "default", label, id, type, placeholder, ...props }: InputProps) {
    return (
        <label className={labelVariants({ variant })} htmlFor={id}>
            <span>{label}</span>
            <div className="input-container">
                <input
                    className="shadow-1"
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    {...props}
                />
                {variant === "default" &&
                    <>
                        <Error aria-hidden="true" className="w-2 error-svg" />
                        <Paw aria-hidden="true" className="paw w-1 valid-svg" />
                    </>
                }
            </div>
        </label>
    )

}