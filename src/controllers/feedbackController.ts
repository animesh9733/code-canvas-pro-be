import { Request, Response } from "express";
import Feedback from "../models/Feedback";

export const saveFeedback = async (req: Request, res: Response) => {
    try {
        const { content, rating, type } = req.body;

        if (!content || rating === undefined) {
            return res.status(400).json({ error: "Content and rating are required" });
        }

        const feedback = await Feedback.create({
            content,
            rating: Number(rating),
            type: type || "general",
        });

        res.status(201).json(feedback);
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ error: "Failed to save feedback" });
    }
};

export const getAllFeedback = async (req: Request, res: Response) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedback);
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ error: "Failed to fetch feedback" });
    }
};
