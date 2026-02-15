import { Request, Response } from "express";
import Snippet from "../models/Snippet";

export const saveSnippet = async (req: Request, res: Response) => {
    try {
        const { code, title } = req.body;

        if (!code) {
            return res.status(400).json({ error: "Code is required" });
        }

        const snippet = await Snippet.create({
            code,
            title: title || "Untitled Snippet",
        });

        res.status(201).json({ id: snippet._id });
    } catch (error) {
        console.error("Error saving snippet:", error);
        res.status(500).json({ error: "Failed to save snippet" });
    }
};

export const getSnippet = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || id.length !== 24) { // Basic MongoDB ObjectId length check
            // It might be a UUID if legacy data is there, but for now we assume ObjectId
            // Or we just catch the error from findById
        }

        const snippet = await Snippet.findById(id);

        if (!snippet) {
            return res.status(404).json({ error: "Snippet not found" });
        }

        res.json({ code: snippet.code, title: snippet.title });
    } catch (error) {
        console.error("Error fetching snippet:", error);
        res.status(500).json({ error: "Failed to fetch snippet" });
    }
};
