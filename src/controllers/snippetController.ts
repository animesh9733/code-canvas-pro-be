import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const saveSnippet = async (req: Request, res: Response) => {
    try {
        const { code, title } = req.body;

        if (!code) {
            return res.status(400).json({ error: "Code is required" });
        }

        const snippet = await prisma.snippet.create({
            data: {
                code,
                title: title || "Untitled Snippet",
            },
        });

        res.status(201).json({ id: snippet.id });
    } catch (error) {
        console.error("Error saving snippet:", error);
        res.status(500).json({ error: "Failed to save snippet" });
    }
};

export const getSnippet = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const snippet = await prisma.snippet.findUnique({
            where: { id },
        });

        if (!snippet) {
            return res.status(404).json({ error: "Snippet not found" });
        }

        res.json({ code: snippet.code, title: snippet.title });
    } catch (error) {
        console.error("Error fetching snippet:", error);
        res.status(500).json({ error: "Failed to fetch snippet" });
    }
};
