import { db } from "./db";

/**
 * Inserts a new redemption record into the database.
 *
 * @param {string} staffPassId - The staff pass ID of the redeeming staff.
 * @param {string} teamName - The name of the team redeeming the gift.
 * @param {number} redeemedAt - The timestamp of redemption.
 * @returns {Promise<number>} The ID of the newly inserted redemption record.
 */
export const addRedemption = async (
  staffPassId: string,
  teamName: string,
  redeemedAt: number
): Promise<number> => {
  const database = await db;
  const result = await database.run(
    "INSERT INTO redemptions (staffPassId, teamName, redeemedAt) VALUES (?, ?, ?)",
    [staffPassId, teamName, redeemedAt]
  );

  if (result.lastID === undefined) {
    throw new Error("Failed to insert record into the redemptions table.");
  }

  return result.lastID;
};

/**
 * Checks whether a gift has already been redeemed by a team.
 *
 * @param {string} teamName - The name of the team to check for redemption.
 * @returns {Promise<boolean>} True if the gift has been redeemed, false otherwise.
 */
export const checkIfTeamHasRedeemedGift = async (
  teamName: string
): Promise<boolean> => {
  const database = await db;
  const result = await database.get(
    "SELECT * FROM redemptions WHERE teamName = ?",
    [teamName]
  );

  // Return true if there is an existing redemption for this team, and false otherwise
  return result ? true : false;
};
