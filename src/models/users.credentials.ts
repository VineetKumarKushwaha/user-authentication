import mongoose, { Schema, Document } from "mongoose";

export interface IUserCredential extends Document {
    username: string;
    password: string;
}

const UserCredentialSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model<IUserCredential>(
    "UserCredential",
    UserCredentialSchema
);
