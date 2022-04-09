import { getWrappedApp, Logger } from "hyougen";
import { NonBodiedContext } from "hyougen/lib/routers";
import koa from "koa";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Showdown from "showdown";
import path from "path";
import AuthRouter from "./routers/auth";
import TaskRouter from "./routers/task";
import fsp from "fs/promises";

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

    const convertor = new Showdown.Converter();
    app.get("/docs", async (ctx) => {
        const fileContent = await fsp.readFile(
            path.join(require("path").resolve("./")) + "/doc.md"
        );
        const html = convertor.makeHtml(fileContent.toString());
        ctx.type = "html";
        ctx.body = html;
    });

    AuthRouter(app, "/user");
    TaskRouter(app, "/task");

    const PORT = Number(process.env.PORT) || 8080;
    app.Listen(PORT, () => {
        app.saveApiDoc();
        Logger.success(`Server started on PORT ${PORT}`, TAG);
    });
}

main();
