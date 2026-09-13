import { ManufacturingDataParser } from "./services/parser.service";

async function main() {
  console.log("==================================================");
  console.log("   MANUFACTURING DATA PARSER - CLEAN ARCHITECTURE ");
  console.log("==================================================\n");

  const parser = new ManufacturingDataParser("data-machine.json");

  try {
    const machines = await parser.loadData();
    console.log(
      `[OK] Data berhasil dimuat. Total: ${machines.length} mesin.\n`,
    );

    // Tampilkan Mesin yang Butuh Maintenance
    const maintenanceList = parser.filterByStatus(machines, "MAINTENANCE");
    console.log("--- MESIN BUTUH MAINTENANCE ---");
    console.table(parser.getSummaries(maintenanceList));
  } catch (err: any) {
    console.error(err.message);
  }
}

main();
