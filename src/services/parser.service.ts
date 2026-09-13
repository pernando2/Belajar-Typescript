import * as fs from "fs/promises"; // Menggunakan fs promises (Async/Await modern)
import * as path from "path";

import {
  MachineData,
  MachineStatus,
  MachineSummary,
} from "../types/machine.type";

export class ManufacturingDataParser {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(process.cwd(), fileName);
  }

  // Reading File secara Async dengan Promise eksplisit
  public async loadData(): Promise<MachineData[]> {
    try {
      const content = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(content) as MachineData[];
    } catch (error) {
      throw new Error(
        `[PARSER ERROR] Gagal membaca atau parse file JSON: ${error}`,
      );
    }
  }

  // Generic Method dengan Constraint
  public filterByStatus<T extends MachineData>(
    machines: T[],
    status: MachineStatus,
  ): T[] {
    return machines.filter((m) => m.status === status);
  }

  // Utility Transformer
  public getSummaries(machines: MachineData[]): MachineSummary[] {
    return machines.map(({ id, name, status }) => ({ id, name, status }));
  }
}
