import { Router } from "express";
import { eventMatchController } from "../containers/eventMatch.container";

const router = Router();

router.get("/:id", eventMatchController.getById.bind(eventMatchController));
router.get("/", eventMatchController.getAll.bind(eventMatchController));
router.get(
  "/event/:eventId/watchlists",
  eventMatchController.getWatchlistMatchesByEvent.bind(eventMatchController)
);
router.get(
  "/watchlist/:watchlistId/events",
  eventMatchController.getEventMatchesByWatchlist.bind(eventMatchController)
);
router.get(
  "/term/:termId",
  eventMatchController.getByTerm.bind(eventMatchController)
);
router.get(
  "/watchlist/:watchlistId",
  eventMatchController.getByWatchlist.bind(eventMatchController)
);

export default router;
