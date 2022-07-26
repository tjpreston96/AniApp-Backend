import { Router } from "express";
import * as mediaCtrl from "../controllers/media.js";
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router();

// Public Routes
router.post("/search/:type", mediaCtrl.search);
router.post("/collection/:type", mediaCtrl.collection);

// Private Routes
router.use(decodeUserFromToken);
router.get("/user/collection/:type", checkAuth, mediaCtrl.userCollection);
router.get(
  "/user/current-collection/:type",
  checkAuth,
  mediaCtrl.currentUserCollection
);
router.post("/user/collection/:type/add", checkAuth, mediaCtrl.add);
router.post("/user/collection/:type/remove", checkAuth, mediaCtrl.remove);

export { router };
