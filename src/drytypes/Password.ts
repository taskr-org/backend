import { makeDryType, String } from "drytypes";

export const Password = makeDryType<string>((x) => {
    if (!String.guard(x)) return { success: false };

    if (x.length < 6 || x.length > 18)
        return {
            success: false,
            message: "Password must be 6-18 characters long",
        };
    else return { success: true };
}, "password (string) ");
