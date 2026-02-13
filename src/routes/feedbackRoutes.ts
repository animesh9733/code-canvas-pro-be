import { Router } from "express";
import { saveFeedback, getAllFeedback } from "../controllers/feedbackController";

const router = Router();

router.post("/", saveFeedback);
router.get("/", getAllFeedback);

export default router;
