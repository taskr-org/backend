import { makeDryType, String } from "drytypes";

export const Description = makeDryType<string>((x) => {
    if (!String.guard(x)) return { success: false };

    if (x.length < 1 || x.length > 500)
        return {
            success: false,
            message: "FullName must be 1-500 characters long",
        };
    else return { success: true };
}, "description (string) ");
