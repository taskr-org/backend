import { ErrorKind, getRoutedWrappedApp, HyError, WrappedApp } from "hyougen";
import { Email } from "../drytypes/Email";
import { FullName } from "../drytypes/FullName";
import { Password } from "../drytypes/Password";
import { Username } from "../drytypes/Username";
import { Token } from "../drytypes/Token";
import User from "../models/User";
import { doesUserExist } from "../utils/user";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { verifyToken } from "../utils/gauth";

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

    router.post(
        "/login",
        { username: Username, password: Password },
        async (ctx) => {
            const { username, password } = ctx.hyBody;

            const existingUser = await User.findOne({ username });

            if (existingUser == undefined) {
                throw new HyError(
                    ErrorKind.NOT_FOUND,
                    "User with specified username does not exist.",
                    TAG
                );
            }

            if (!(await bcrypt.compare(password, existingUser.password))) {
                throw new HyError(
                    ErrorKind.UNAUTHORIZED,
                    "Invalid username or password.",
                    TAG
                );
            }

            const token = uuid();

            existingUser.token = token;
            await existingUser.save();

            return ctx.hyRes.success("User was logged in successfully", {
                token,
            });
        }
    );

    router.post("/gauth", { token: Token }, async (ctx) => {
        const { token } = ctx.hyBody;

        // verify auth token and return g userid
        const userid = await verifyToken(token);

        // TODO: get userdata from payload and create/login as required
        // https://developers.google.com/identity/one-tap/android/idtoken-auth

        ctx.hyRes.genericSuccess();
    });
};
