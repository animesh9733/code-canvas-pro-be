import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const saveFeedback = async (req: Request, res: Response) => {
    try {
        const { content, rating, type } = req.body;

        if (!content || rating === undefined) {
            return res.status(400).json({ error: "Content and rating are required" });
        }

        const feedback = await prisma.feedback.create({
            data: {
                content,
                rating: Number(rating),
                type: type || "general",
            },
        });

        res.status(201).json(feedback);
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ error: "Failed to save feedback" });
    }
};

export const getAllFeedback = async (req: Request, res: Response) => {
    try {
        const feedback = await prisma.feedback.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(feedback);
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ error: "Failed to fetch feedback" });
    }
};
