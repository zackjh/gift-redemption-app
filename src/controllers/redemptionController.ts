import { Request, Response } from "express";
import {
  addRedemption,
  checkIfTeamHasRedeemedGift,
} from "../models/redemptionModel";
import { dataStore } from "../dataStore";

/**
 * Handles the redemption of gifts by staff members.
 * Validates staff pass ID, checks team membership and redemption status,
 * and records new redemptions.
 *
 * @param {Request} req - The request object from Express.
 * @param {Response} res - The response object from Express.
 */
export async function redeemGift(req: Request, res: Response) {
  try {
    const { staffPassId } = req.body;

    // Ensure staff pass ID is provided
    if (!staffPassId) {
      res.status(400).send({ message: "staffPassId was not provided." });
      return;
    }

    // Retrieve team name using staff pass ID
    const teamName = dataStore.getTeamNameByStaffPassId(staffPassId);

    // Verify team membership
    if (!teamName) {
      res.status(400).send({
        message: `The staff member ${staffPassId} is not part of a team.`,
      });
      return;
    }

    // Check redemption status for the team
    const alreadyRedeemed = await checkIfTeamHasRedeemedGift(teamName);
    if (alreadyRedeemed) {
      res.status(400).send({
        message: `The gift for team ${teamName} has already been redeemed.`,
      });
      return;
    }

    // Record new redemption
    await addRedemption(staffPassId, teamName, Date.now());
    res.status(201).send({
      message: `The gift for team ${teamName} has been redeemed successfully.`,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ message: "An unknown error occurred." });
  }
}
