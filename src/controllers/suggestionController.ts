import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const saveSuggestion = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const suggestion = await prisma.suggestion.create({
            data: {
                title,
                description,
            },
        });

        res.status(201).json(suggestion);
    } catch (error) {
        console.error("Error saving suggestion:", error);
        res.status(500).json({ error: "Failed to save suggestion" });
    }
};

export const getAllSuggestions = async (req: Request, res: Response) => {
    try {
        const suggestions = await prisma.suggestion.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(suggestions);
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        res.status(500).json({ error: "Failed to fetch suggestions" });
    }
};

export const updateSuggestionStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id || typeof id !== "string") {
            return res.status(400).json({ error: "Invalid ID" });
        }

        if (!status) {
            return res.status(400).json({ error: "Status is required" });
        }

        const suggestion = await prisma.suggestion.update({
            where: { id },
            data: { status },
        });

        res.json(suggestion);
    } catch (error) {
        console.error("Error updating suggestion:", error);
        res.status(500).json({ error: "Failed to update suggestion" });
    }
};
