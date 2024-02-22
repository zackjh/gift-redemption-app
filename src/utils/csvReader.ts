import fs from "fs";
import csvParser from "csv-parser";

export interface StaffIdToTeamMappingRecord {
  staff_pass_id: string;
  team_name: string;
  created_at: number;
}

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
