import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from 'tailwind-variants';
import "./Button.css";

type Button = {
    children: ReactNode;
    variant: "default" | "edit" | "delete" | "update" | "add" | "authentication";
} & React.ButtonHTMLAttributes<HTMLButtonElement>


const buttonVariants = tv({
    base: "cta",
    variants: {
        variant: {
            default: "font-caveat text-2xl",
            edit: "action-btn edit",
            delete: "action-btn delete",
            update: "update-btn",
            add: "action-btn add",
            authentication: "font-caveat text-2xl shadow-1 mt-2"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});

export function Button({ children, variant, className, ...props }: Button) {
    return (
        <button className={twMerge(
            buttonVariants({ variant }),
            className
        )}
            {...props}
        >
            {children}
        </button>
    )
}