import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from 'tailwind-variants';
import "./Button.css";

type Button = {
    children: ReactNode;
    variant?: "default" | "edit" | "delete" | "update" | "add" | "authentication" | "cancelFile";
} & React.ButtonHTMLAttributes<HTMLButtonElement>


const buttonVariants = tv({
    base: "cta",
    variants: {
        variant: {
            default: "text-sm font-medium",
            edit: "action-btn edit",
            delete: "action-btn delete",
            update: "update-btn",
            add: "action-btn add",
            authentication: "font-caveat text-2xl shadow-1 mt-2",
            cancelFile: "action-btn cancel-file",
        }
    },
    defaultVariants: {
        variant: "default"
    }
});

export function Button({ children, variant = "default", className, ...props }: Button) {
    return (
        <button className={twMerge(
            buttonVariants({ variant }),
            className
        )}
            tabIndex={0}
            {...props}
        >
            {children}
        </button>
    )
}