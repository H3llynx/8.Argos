import { forwardRef, type ReactNode } from "react";
import "./Popup.css";

type Popup = {
    close: () => void;
    children: ReactNode
}

export const Popup = forwardRef<HTMLDialogElement, Popup>(({ close, children }, ref) => {
    return (
        <dialog
            ref={ref}
            className="[[open]]:flex [[open]]:flex-col dialog shadow-2"
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