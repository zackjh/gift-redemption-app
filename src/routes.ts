import { Router } from "express";
import { redeemGift } from "./controllers/redemptionController";

const router = Router();

router.post("/redeem", redeemGift);

export default router;
