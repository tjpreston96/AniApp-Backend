import { Router } from "express";
import * as mediaCtrl from "../controllers/media.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

// Public Routes
router.get("/search/anime/:title", mediaCtrl.animeSearch);
router.get("/search/manga/:title", mediaCtrl.mangaSearch);

// Private Routes
router.use(decodeUserFromToken);

export { router };
