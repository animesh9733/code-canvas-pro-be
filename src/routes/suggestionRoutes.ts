import { Router } from "express";
import {
    saveSuggestion,
    getAllSuggestions,
    updateSuggestionStatus
} from "../controllers/suggestionController";

const router = Router();

router.post("/", saveSuggestion);
router.get("/", getAllSuggestions);
router.patch("/:id/status", updateSuggestionStatus);

export default router;
