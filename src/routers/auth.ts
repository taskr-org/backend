import { ErrorKind, getRoutedWrappedApp, HyError, WrappedApp } from "hyougen";
import { Email } from "../drytypes/Email";
import { FullName } from "../drytypes/FullName";
import { Password } from "../drytypes/Password";
import { Username } from "../drytypes/Username";
import User from "../models/User";
import { doesUserExist } from "../utils/user";

const TAG = "src/routers/auth.ts";

export default (wapp: WrappedApp, root: string) => {
    const router = getRoutedWrappedApp(wapp, root);

    router.post(
        "/register",
        {
            fullname: FullName,
            username: Username,
            email: Email,
            password: Password,
        },
        async (ctx) => {
            const { email, password, fullname, username } = ctx.hyBody;

            //check if user exists
            if (await doesUserExist(username, email)) {
                throw new HyError(
                    ErrorKind.CONFLICT,
                    "User with email/username already exists.",
                    TAG
                );
            }

            // create user
            await User.create({ email, password, username, fullname });

            ctx.hyRes.success("User registered successfully!");
        }
    );
};
