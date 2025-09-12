import { Router } from "express";
import watchlistRoutes from "./watchlist.routes";
import eventRoutes from "./event.routes";
import authRoutes from "./auth.routes";

import eventMatchRoutes from "./eventMatch.routes";
import watchListTermRoutes from "./watchlistTerm.routes";

import healthRoutes from "./health.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/watchlists", watchlistRoutes);
router.use("/event-matches", eventMatchRoutes);
router.use("/events", eventRoutes);
router.use("/watchlist-terms", watchListTermRoutes);
router.use("/health", healthRoutes);

export default router;
