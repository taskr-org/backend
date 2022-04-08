import { makeDryType, String } from "drytypes";

const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Email = makeDryType<string>((x) => {
    if (!String.guard(x)) return { success: false };

    if (re.test(x.toLowerCase())) return { success: true };
    else return { success: false, message: "Invalid Email" };
}, "email (string) ");
