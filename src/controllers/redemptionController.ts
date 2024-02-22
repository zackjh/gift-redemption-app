import { Request, Response } from "express";
import {
  addRedemption,
  checkIfTeamHasRedeemedGift,
} from "../models/redemptionModel";
import { readCsv } from "../utils/csvReader";
import { dataStore } from "../dataStore";

export async function redeemGift(req: Request, res: Response) {
  try {
    const { staffPassId } = req.body;

    // Validate request data
    if (!staffPassId) {
      res.status(400).send({ message: "staffPassId was not provided." });
      return;
    }

    // Look up this staff member's team name
    const teamName = dataStore.getTeamNameByStaffPassId(staffPassId);

    // Validate that this staff member is part of a team
    if (teamName === undefined) {
      res.status(400).send({
        message: `The staff member ${staffPassId} is not part of a team.`,
      });
      return;
    }

    // Check if this team's gift has already been redeemed
    const alreadyRedeemed = await checkIfTeamHasRedeemedGift(teamName);
    if (alreadyRedeemed) {
      res.status(400).send({
        message: `The gift for team ${teamName} has already been redeemed.`,
      });
      return;
    }

    // If this team's gift has yet to be redeemed, proceed to add a new redemption
    const redemptionId = await addRedemption(staffPassId, teamName, Date.now());
    res.status(201).send({
      message: `The gift for team ${teamName} has been redeemed successfully.`,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
      return;
    }
    res.status(500).send({ message: "An unknown error occured." });
  }
}
