import { tv } from 'tailwind-variants';

type Tag = {
    status: "scheduled" | "completed" | "cancelled"
}

const tagVariants = tv({
    base: "text-xs font-medium py-[5px] px-0.5 rounded-md",
    variants: {
        status: {
            scheduled: "bg-[#84db84]",
            completed: "bg-grey-2",
            cancelled: "bg-red",
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