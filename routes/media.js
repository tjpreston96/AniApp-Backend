import { Router } from "express";
import * as mediaCtrl from "../controllers/media.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

// Public Routes
router.post("/search/:type", mediaCtrl.search);
router.post("/collection/:type", mediaCtrl.collection);

// Private Routes
router.use(decodeUserFromToken);
router.post("/collection/:type/add", checkAuth, mediaCtrl.add);
router.get("/user/collection/:type", checkAuth, mediaCtrl.userCollection);


export { router };
