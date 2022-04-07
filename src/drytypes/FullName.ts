import { makeDryType, String } from "drytypes";

export const FullName = makeDryType<string>((x) => {
    if (!String.guard(x)) return { success: false };

    if (x.length < 4 || x.length > 18)
        return {
            success: false,
            message: "FullName must be 4-18 characters long",
        };
    else return { success: true };
});
