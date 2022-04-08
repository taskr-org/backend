import { makeDryType, String } from "drytypes";

export const Token = makeDryType<string>((x) => {
    if (!String.guard(x)) return { success: false };

    if (x === "")
        return {
            success: false,
            message: "Token must be a valid string",
        };
    else return { success: true };
}, "token (string) ");
