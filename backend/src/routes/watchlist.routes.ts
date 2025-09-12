import { Router } from "express";
import { watchlistController } from "../containers/watchlist.container";

const router = Router();

router.get("/:id", watchlistController.getById.bind(watchlistController));
router.get("/", watchlistController.getAll.bind(watchlistController));

router.post("/", watchlistController.create.bind(watchlistController));

router.delete("/:id", watchlistController.remove.bind(watchlistController));

export default router;
