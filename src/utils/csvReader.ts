import fs from "fs";
import csvParser from "csv-parser";

/**
 * Defines the structure of a staff ID to team mapping record.
 */
export interface StaffIdToTeamMappingRecord {
  staff_pass_id: string;
  team_name: string;
  created_at: number;
}

/**
 * Reads a CSV file and parses its contents into an array of mapping records.
 *
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<StaffIdToTeamMappingRecord[]>} A promise that resolves to an array of mapping records.
 */
export const readCsv = (
  filePath: string
): Promise<StaffIdToTeamMappingRecord[]> => {
  const result: StaffIdToTeamMappingRecord[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => result.push(data))
      .on("end", () => resolve(result))
      .on("error", (error) => reject(error));
  });
};
