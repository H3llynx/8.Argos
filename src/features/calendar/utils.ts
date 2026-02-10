
export const dbDateToDateTimeLocal = (date: string) => {
    if (!date) return "";
    return date.slice(0, 16);
};

export const dateTimeLocalToDb = (date: string) => {
    if (!date) return "";
    return new Date(date).toISOString();
};
