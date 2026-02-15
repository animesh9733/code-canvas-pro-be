import mongoose, { Schema, Document } from "mongoose";

export interface ISnippet extends Document {
    title: string;
    code: string;
    isPublic: boolean;
    createdAt: Date;
}

const SnippetSchema: Schema = new Schema({
    title: { type: String, required: true, default: "Untitled Snippet" },
    code: { type: String, required: true },
    isPublic: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ISnippet>("Snippet", SnippetSchema);
