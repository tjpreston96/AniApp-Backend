import { Router } from "express";
import * as mediaCtrl from "../controllers/media.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

// Public Routes
router.post("/search/:type", mediaCtrl.search);
router.post("/collection/:type", mediaCtrl.collection);

// Private Routes
router.use(decodeUserFromToken);

export { router };
