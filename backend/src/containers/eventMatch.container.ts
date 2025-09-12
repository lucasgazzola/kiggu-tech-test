import { EventMatchController } from "../controllers/eventMatch.controller";
import { EventMatchService } from "../services/eventMatch.service";
import { EventMatchPrismaRepository } from "../repositories/prisma/eventMatch-prisma.repository";

export const eventMatchController = new EventMatchController(
  new EventMatchService(new EventMatchPrismaRepository())
);
