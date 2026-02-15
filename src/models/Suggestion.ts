import mongoose, { Schema, Document } from "mongoose";

export interface ISuggestion extends Document {
    title: string;
    description: string;
    status: string;
    createdAt: Date;
}

const SuggestionSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "not reviewed" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ISuggestion>("Suggestion", SuggestionSchema);
