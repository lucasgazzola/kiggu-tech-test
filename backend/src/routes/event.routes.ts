import { Router } from "express";
import { eventController } from "../containers/event.container";

const router = Router();

router.post("/", eventController.create.bind(eventController));
router.post("/:id/enrich", eventController.enrich.bind(eventController));

router.get("/", eventController.getAll.bind(eventController));
router.get("/:id", eventController.getById.bind(eventController));

router.put("/:id", eventController.update.bind(eventController));

export default router;
