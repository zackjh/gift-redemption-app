import { Router } from "express";
import { redeemGift } from "./controllers/redemptionController";

// Create a new router instance
const router = Router();

/**
 * Route definitions
 */
// Handles POST requests for gift redemption
router.post("/redeem", redeemGift);

export default router;
