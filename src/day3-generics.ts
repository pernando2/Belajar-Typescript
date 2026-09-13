// Tanpa Generics, kita harus buat banyak fungsi atau pakai 'any' (tidak direkomendasikan)
// Dengan Generics <T>, 'T' adalah variabel untuk tipe data (Type)

function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}

// 1. Digunakan untuk array of string (Nama Material)
const materials = ["Steel", "Aluminum", "Copper"];
const firstMaterial = getFirstItem(materials);
// AntiGravity/TS otomatis tahu 'firstMaterial' bertipe string!

// 2. Digunakan untuk array of number (ID Mesin)
const machineIds = [101, 102, 103];
const firstId = getFirstItem(machineIds);
// AntiGravity/TS otomatis tahu 'firstId' bertipe number!

console.log(`Material pertama: ${firstMaterial}`); // Output: Steel
console.log(`ID Mesin pertama: ${firstId}`); // Output: 101

// Generic Interface untuk Response API
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T; // Tipe data 'data' fleksibel mengikuti T
}

// Model Data Manufaktur
interface Machine {
  id: number;
  name: string;
  status: "RUNNING" | "STOPPED" | "MAINTENANCE";
}

interface ProductionLog {
  logId: string;
  totalOutput: number;
}

// Penggunaan 1: Response API yang membawa data Mesin
const machineResponse: ApiResponse<Machine> = {
  success: true,
  message: "Detail mesin berhasil diambil",
  data: {
    id: 1,
    name: "CNC Milling Machine 01",
    status: "RUNNING",
  },
};

// Penggunaan 2: Response API yang membawa data Log Produksi
const logResponse: ApiResponse<ProductionLog> = {
  success: true,
  message: "Log produksi berhasil diperbarui",
  data: {
    logId: "LOG-20260330-01",
    totalOutput: 1500,
  },
};

console.log(machineResponse.data.name); // Auto-complete dari AntiGravity akan muncul!

// Interface batasan: Harus punya properti 'id'
interface HasId {
  id: number | string;
}

// Generic Constraint: 'T extends HasId' artinya T BISA tipe apa saja, ASALKAN punya atribut 'id'
// Default Type: <T extends HasId = HasId> memberikan default type jika tidak diisi
function printEntityId<T extends HasId>(entity: T): void {
  console.log(`Entity ID: ${entity.id}`);
}

// VALID: Karena object ini punya properti 'id'
printEntityId({ id: "MC-01", location: "Line A" });
printEntityId({ id: 105, operator: "Pernando" });

// INVALID (Akan Error di AntiGravity IDE):
// printEntityId({ name: "Sparepart B" });
// Error: Property 'id' is missing in type '{ name: string; }'
