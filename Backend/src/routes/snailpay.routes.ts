import { Router } from "express";
import { charge } from "../controllers/snailpay.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { authRequired } from "../middlewares/authRequired.js";
import { chargeSchema } from "../schemas/snailpay.schema.js";

const router = Router();

router.post("/charge", authRequired, validateSchema(chargeSchema), charge);

export default router;
