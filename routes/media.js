import { Router } from "express";
import * as mediaCtrl from "../controllers/media.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

// Public Routes
router.get("/search/:type", mediaCtrl.search);
router.get("/collection/:type/:collection", mediaCtrl.collection);


// Private Routes
router.use(decodeUserFromToken);

export { router };
