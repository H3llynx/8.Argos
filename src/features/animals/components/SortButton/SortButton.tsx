import ArrowDown from "../../../../assets/svg/arrow-down.svg?react"
import ArrowUp from "../../../../assets/svg/arrow-up.svg?react"
import Reset from "../../../../assets/svg/sort_off.svg?react"

type SortButtonType = {
    column?: string,
    isAscending?: boolean,
    isActive?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function SortButton({ column, onClick, isAscending, isActive }: SortButtonType) {
    return (
        <button
            tabIndex={0}
            onClick={onClick}
            className="flex items-center capitalize"
        >
            {column}
            {column && isActive && (isAscending ? <ArrowUp aria-label="ascending" /> : <ArrowDown aria-label="descending" />)}
            {!column && isActive && <Reset aria-label="reset order" className="w-1" />}
        </button>
    )
}