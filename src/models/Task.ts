import { model, Schema } from "mongoose";
import { TaskSchema } from "../../MonType";

const TaskSchema = new Schema<TaskSchema>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        reminder: { type: Boolean, default: false },
        datetime: { type: String, required: false },
        link: { type: String, required: false },
        tag: { type: String, required: true },
        priority: { type: String, required: true },
        isCompleted: { type: Boolean, default: false },
        userID: { type: String, required: true },
    },
    {
        timestamps: true,
        _id: true,
        id: true,
    }
);

export default model<TaskSchema>("Task", TaskSchema, "task");
