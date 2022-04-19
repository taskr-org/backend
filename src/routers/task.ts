import { ErrorKind, getRoutedWrappedApp, HyError, WrappedApp } from "hyougen";
import { String, Boolean } from "drytypes";
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
            reminder: Boolean,
            link: String,
            priority: String,
            datetime: String,
            tag: String,
        },
        async (ctx) => {
            const {
                title,
                description,
                reminder,
                link,
                datetime,
                priority,
                tag,
            } = ctx.hyBody;

            // TODO (minor)
            // 1. check if tag valid from user object
            // 2. check if priority value valid

            await Task.create({
                title,
                description,
                reminder,
                link,
                datetime,
                priority,
                tag,
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
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new HyError(ErrorKind.BAD_REQUEST, "Invalid task id", TAG);
        }

        const task = await Task.findById(id).lean();
        ctx.hyRes.success("Request successful", { task: task });
    });

    // TODO: Fix
    router.delete("/delete", { id: String }, async (ctx) => {
        const { id } = ctx.hyBody;
        await Task.findByIdAndDelete(id);

        ctx.hyRes.genericSuccess();
    });
};
