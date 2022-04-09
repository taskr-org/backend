import { getRoutedWrappedApp, WrappedApp } from "hyougen";
import { String, ArrayOf, Boolean } from "drytypes";
import { verifyToken } from "../middlewares/verifyToken";
import { TaskTitle } from "../drytypes/TaskTitle";
import { Description } from "../drytypes/Description";
import Task from "../models/Task";
import { TaskSchema } from "../../MonType";

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
                userID: ctx.state.user.id,
            });

            ctx.hyRes.success("Task created successfully.");
        }
    );

    router.get("/getall", async (ctx) => {
        const userID = ctx.state.user.id;

        const tasks: Array<TaskSchema> = await Task.find({ userID }).lean();
        ctx.hyRes.success("Request successful", { tasks: tasks });
    });

    router.get("/get/:id", async (ctx) => {
        const id = ctx.params.id;

        const task: TaskSchema = await Task.findOne({ id }).lean();
        ctx.hyRes.success("Request successful", { task: task });
    });

    router.delete("/delete", { id: String }, async (ctx) => {
        const { id } = ctx.hyBody;
        await Task.deleteOne({ id });

        ctx.hyRes.genericSuccess();
    });
};
