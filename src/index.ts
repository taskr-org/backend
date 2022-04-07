import { getWrappedApp, Logger } from "hyougen";
import { NonBodiedContext } from "hyougen/lib/routers";
import koa from "koa";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRouter from "./routers/auth";

const TAG = "src/main.ts";

async function main() {
    dotenv.config();

    const app = getWrappedApp(new koa(), true);

    try {
        await mongoose.connect(
            process.env.DB_URI || "mongodb://localhost/taskr"
        );
    } catch (err) {
        return Logger.error(`Error connecting to database.\n${err}`, TAG);
    }

    app.get("/", (ctx: NonBodiedContext) => {
        ctx.hyRes.success("Hello, World!");
    });

    AuthRouter(app, "/user");

    const PORT = Number(process.env.PORT) || 8080;
    app.Listen(PORT, () => {
        Logger.success(`Server started on PORT ${PORT}`, TAG);
    });
}

main();
