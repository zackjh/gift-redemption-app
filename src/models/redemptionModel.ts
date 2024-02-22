import { db } from "./db";

export const addRedemption = async (
  staffPassId: string,
  teamName: string,
  redeemedAt: number
): Promise<number> => {
  const database = await db;
  const result = await database.run(
    `
    INSERT INTO redemptions (staffPassId, teamName, redeemedAt)
    VALUES (?, ?, ?)
    `,
    [staffPassId, teamName, redeemedAt]
  );

  if (result.lastID === undefined) {
    throw new Error("Failed to insert record into the redemptions table.");
  }
  // Return the ID of the inserted record
  return result.lastID;
};

export const checkIfTeamHasRedeemedGift = async (
  teamName: string
): Promise<boolean> => {
  const database = await db;
  const result = await database.get(
    `
    SELECT *
    FROM redemptions
    WHERE teamName = ?
    `,
    [teamName]
  );

  // Return true if there is an existing redemption for this team, and false otherwise
  return result ? true : false;
};
