import * as fs from "fs";
import * as path from "path";

// 1. Model Data Manufaktur
type MachineStatus = "RUNNING" | "STOPPED" | "MAINTENANCE";

interface MachineData {
  id: string;
  name: string;
  operatingHours: number;
  status: MachineStatus;
}

// DTO untuk laporan ringkas (Utility Type Pick)
type MachineSummary = Pick<MachineData, "id" | "name" | "status">;

// 2. Class Parser Data JSON (OOP & Async)
class ManufacturingDataParser {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(process.cwd(), fileName);
  }

  // Fungsi Async untuk Membaca File JSON
  public async loadData(): Promise<MachineData[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, "utf-8", (err, content) => {
        if (err) {
          reject(`[ERROR] Gagal membaca file: ${err.message}`);
          return;
        }
        try {
          const parsedData: MachineData[] = JSON.parse(content);
          resolve(parsedData);
        } catch (parseErr) {
          reject("[ERROR] Format JSON tidak valid!");
        }
      });
    });
  }

  // Fungsi Generic untuk Filter Data berdasarkan Status
  public filterByStatus<T extends MachineData>(
    machines: T[],
    status: MachineStatus,
  ): T[] {
    return machines.filter((m) => m.status === status);
  }

  // Menghasilkan Rangkuman Singkat
  public getSummaries(machines: MachineData[]): MachineSummary[] {
    return machines.map((m) => ({
      id: m.id,
      name: m.name,
      status: m.status,
    }));
  }
}

// 3. Eksekusi CLI App
async function runCLI() {
  console.log("=========================================");
  console.log("   MANUFACTURING DATA PARSER CLI TOOL   ");
  console.log("=========================================\n");

  const parser = new ManufacturingDataParser("data-machine.json");

  try {
    const machines = await parser.loadData();
    console.log(`[SUCCESS] Berhasil membaca ${machines.length} data mesin.\n`);

    // Tampilkan Semua Data
    console.log("--- DAFTAR METRICS MESIN ---");
    console.table(machines);

    // Filter Mesin yang Butuh Maintenance (Menggunakan Generic Filter)
    const maintenanceNeeded = parser.filterByStatus(machines, "MAINTENANCE");
    console.log("\n--- MESIN DALAM STATUS MAINTENANCE ---");
    console.table(parser.getSummaries(maintenanceNeeded));
  } catch (error) {
    console.error(error);
  }
}

runCLI();
