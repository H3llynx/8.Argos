import { forwardRef, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import "./Popup.css";

type Popup = {
    close: () => void;
    children: ReactNode;
    variant?: "default" | "auth";
}

const popupVariants = tv({
    base: "[[open]]:flex [[open]]:flex-col m-auto backdrop:bg-black/50 border rounded-lg w-sm text-center",
    variants: {
        variant: {
            default: "px-1 pb-1 pt-0.5 bg-white border-dark-rgba shadow-2",
            auth: "px-1 pt-0.5 bg-[#f7f9f6] border-grey-2 gap-0.5",
        }
    },
    defaultVariants: {
        variant: "default"
    }
});

export const Popup = forwardRef<HTMLDialogElement, Popup>(({ close, children, variant = "default" }, ref) => {
    return (
        <dialog
            ref={ref}
            className={popupVariants({ variant })}
        >
            <button
                className="self-end text-lg"
                tabIndex={0}
                onClick={close}
                aria-label="Close">
                ✕
            </button>
            {children}
        </dialog>
    )
})