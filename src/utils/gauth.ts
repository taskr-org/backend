import { ErrorKind, HyError } from "hyougen";
import { OAuth2Client } from "google-auth-library";

const TAG = "utils/gauth.ts";

export const verifyToken = async (token: string) => {
    // Specify the CLIENT_ID of the app that accesses the backend
    // CLIENT_ID is generated from Google Console as (Android App)
    const CLIENT_ID = process.env.CLIENT_ID || "";
    if (CLIENT_ID == "" || CLIENT_ID == undefined) {
        throw new HyError(
            ErrorKind.INTERNAL_SERVER_ERROR,
            "Could not process the request at the moment.",
            TAG
        );
    }

    const client = new OAuth2Client(CLIENT_ID);

    const ticket = await client
        .verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        })
        .catch((err) => {
            throw new HyError(ErrorKind.BAD_REQUEST, err, TAG);
        });

    const payload = ticket.getPayload();
    if (payload != undefined) {
        const userid = payload["sub"];
        return userid;
    } else {
        throw new HyError(
            ErrorKind.BAD_REQUEST,
            "Invalid token or Internal server error",
            TAG
        );
    }
};
