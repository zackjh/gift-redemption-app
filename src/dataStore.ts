import { readCsv, StaffIdToTeamMappingRecord } from "./utils/csvReader";

class DataStore {
  private staffIdToTeamMappings: StaffIdToTeamMappingRecord[] = [];

  async load() {
    const csvFilePath = process.env.CSV_FILE_PATH;
    if (!csvFilePath) {
      throw new Error("CSV_FILE_PATH environment variable is not set.");
    }

    this.staffIdToTeamMappings = await readCsv(process.env.CSV_FILE_PATH || "");
  }

  getTeamNameByStaffPassId(staffPassId: string): string | undefined {
    const mapping = this.staffIdToTeamMappings.find(
      (record) => record.staff_pass_id === staffPassId
    );
    return mapping?.team_name;
  }
}

export const dataStore = new DataStore();
