import Logo from "../../assets/svg/logo.svg?react";
export function Footer() {
    return (
        <footer className="py-1 px-4 flex justify-center items-center relative z-1">
            <span className="text-xs">Powered by</span><Logo className="w-5" />
        </footer>
    )
}