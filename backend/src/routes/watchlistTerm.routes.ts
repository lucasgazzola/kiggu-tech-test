import { Router } from "express";
import { watchListTermController } from "../containers/watchlistTerm.container";

const router = Router();

router.get(
  "/:id",
  watchListTermController.getById.bind(watchListTermController)
);
router.get("/", watchListTermController.getAll.bind(watchListTermController));

router.post("/", watchListTermController.create.bind(watchListTermController));

router.delete(
  "/:id",
  watchListTermController.remove.bind(watchListTermController)
);

export default router;
