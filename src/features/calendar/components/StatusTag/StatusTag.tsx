import { tv } from 'tailwind-variants';
import type { Event } from '../../types';


type Tag = {
    status: Event["status"]
}

const tagVariants = tv({
    base: "text-xs font-medium py-[5px] px-0.5 rounded-md",
    variants: {
        status: {
            scheduled: "bg-[#84db84]",
            updated: "bg-grey-2",
            postponed: "bg-red",
        }
    }
});

export function StatusTag({ status }: Tag) {
    return (
        <p className={tagVariants({ status })}>
            {status}
        </p>
    )
}