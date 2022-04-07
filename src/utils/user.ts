import User from "../models/User";

export const doesUserExist = async (username: string, email: string) => {
    const existingUsername = await User.findOne({
        username,
    }).lean();

    const existingEmail = await User.findOne({
        email,
    }).lean();

    return existingUsername != undefined && existingEmail != undefined;
};
