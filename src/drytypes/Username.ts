import { makeDryType, String } from "drytypes";

export const Username = makeDryType<string>((x) => {
    if (!String.guard(x)) return { success: false };

    if (x.length < 4 || x.length > 14)
        return {
            success: false,
            message: "Username must be 4-14 characters long",
        };
    else return { success: true };
}, "username (string) ");
