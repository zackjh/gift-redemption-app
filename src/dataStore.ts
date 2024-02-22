import { readCsv, StaffIdToTeamMappingRecord } from "./utils/csvReader";

/**
 * DataStore class to load and access staff ID to team mappings.
 */
class DataStore {
  private staffIdToTeamMappings: StaffIdToTeamMappingRecord[] = [];

  /**
   * Loads staff ID to team mappings from a CSV file specified by an environment variable.
   */
  async load() {
    const csvFilePath = process.env.CSV_FILE_PATH;
    if (!csvFilePath) {
      throw new Error("CSV_FILE_PATH environment variable is not set.");
    }

    this.staffIdToTeamMappings = await readCsv(csvFilePath);
  }

  /**
   * Retrieves the team name associated with a given staff pass ID.
   * @param {string} staffPassId - The staff pass ID to look up.
   * @returns {string | undefined} The team name, or undefined if not found.
   */
  getTeamNameByStaffPassId(staffPassId: string): string | undefined {
    const mapping = this.staffIdToTeamMappings.find(
      (record) => record.staff_pass_id === staffPassId
    );
    return mapping?.team_name;
  }
}

export const dataStore = new DataStore();
