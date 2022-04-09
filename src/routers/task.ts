import { getRoutedWrappedApp, WrappedApp } from "hyougen";
import { String, ArrayOf, Boolean } from "drytypes";
import { verifyToken } from "../middlewares/verifyToken";
import { TaskTitle } from "../drytypes/TaskTitle";
import { Description } from "../drytypes/Description";
import Task from "../models/Task";

const TAG = "src/routers/task.ts";

export default (wapp: WrappedApp, root: string) => {
    const router = getRoutedWrappedApp(wapp, root, verifyToken);

    router.post(
        "/new",
        {
            title: TaskTitle,
            description: Description,
            notification: Boolean,
            location: String,
            link: String,
            datetime: String,
            tags: ArrayOf(String),
        },
        async (ctx) => {
            const {
                title,
                description,
                notification,
                location,
                link,
                datetime,
                tags,
            } = ctx.hyBody;

            await Task.create({
                title,
                description,
                notification,
                location,
                link,
                datetime,
                tags,
            });

            ctx.hyRes.success("Task created successfully.");
        }
    );
};
