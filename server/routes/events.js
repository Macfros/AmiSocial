import express from "express";
import {getFeedEvents, getUserEvents} from "../controllers/events.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();


/*READ*/
router.get("/",verifyToken,getFeedEvents);
router.get("/:userId/events", verifyToken,getUserEvents);


export default router;
