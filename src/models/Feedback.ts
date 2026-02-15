import mongoose, { Schema, Document } from "mongoose";

export interface IFeedback extends Document {
    content: string;
    rating: number;
    type: string;
    createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    type: { type: String, default: "general" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFeedback>("Feedback", FeedbackSchema);
