import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserSchema } from "../../MonType";

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: true },
        fullname: { type: String, required: true },
        token: { type: String },
    },
    {
        timestamps: true,
        _id: true,
        id: true,
    }
);

UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hashSync(this.password, 8);
    next();
});

export default model<UserSchema>("User", UserSchema, "user");
