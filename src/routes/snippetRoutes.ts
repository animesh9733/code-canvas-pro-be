import { Router } from "express";
import { saveSnippet, getSnippet } from "../controllers/snippetController";

const router = Router();

router.post("/", saveSnippet);
router.get("/:id", getSnippet);

export default router;
