import { makeDryType, String } from "drytypes";

export const TaskTitle = makeDryType<string>((x) => {
    if (!String.guard(x)) return { success: false };

    if (x.length < 1 || x.length > 30)
        return {
            success: false,
            message: "FullName must be 1-30 characters long",
        };
    else return { success: true };
}, "title (string) ");
