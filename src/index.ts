// TYPE DATA BASICS

// primitive types ( string, number, boolean, array, tuple )
let nama: string = "Nann";
let umur: number = 28;
let isDeveloper: boolean = true;
let hobi: string[] = ["coding", "olahraga", "ngopi"];

// tuple (array panjang & tipe tetap)
let biodata: [string, number, boolean] = ["Nann", 28, true];

// object types
interface Developer {
    nama: string;
    stack: string[];
    tahunPengalaman: number;
    aktif: boolean;
}

const saya: Developer = {
    nama: "Nann",
    stack: ["Laravel", "PHP", "MySQL"],
    tahunPengalaman: 5,
    aktif: true
}

// union & literal types
type Status = "pending" | "in_progress" | "completed";
type ID = string | number;

let taskStatus: Status = "pending";
taskStatus = "in_progress"; // OK
// taskStatus = "cancelled"; // ERROR: Type '"cancelled"' not assignable

// Generics dasar
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const angka = firstElement([1, 2, 3]);     // number
const huruf = firstElement(["a", "b", "c"]); // string

// Utility types practice
type PartialDev = Partial<Developer>;      // Semua optional
type RequiredDev = Required<PartialDev>;   // Semua required
type PickDev = Pick<Developer, "nama" | "stack">; // Hanya nama & stack
type OmitDev = Omit<Developer, "aktif">;   // Kecuali aktif
type RecordDev = Record<string, Developer>; // Dictionary

// ============ TYPE NARROWING ============
function processInput(input: string | number): string {
  if (typeof input === "string") {
    return input.toUpperCase(); // TS tau ini string
  }
  return input.toFixed(2); // TS tau ini number
}

// Discriminated union
interface Success { status: "success"; data: string; }
interface Error { status: "error"; message: string; }
type Result = Success | Error;

function handleResult(result: Result): void {
  switch (result.status) {
    case "success":
      console.log("Data:", result.data); // TS tau ini Success
      break;
    case "error":
      console.error("Error:", result.message); // TS tau ini Error
      break;
  }
}

// ============ MAIN ============
console.log("🚀 TypeScript Practice Started!");
console.log(`Biodata: Nama ${biodata[0]}, Umur ${biodata[1]}, Aktif ${biodata[2]}`);
console.log(`Developer: ${saya.nama}, Stack: ${saya.stack.join(", ")}, Tahun Pengalaman: ${saya.tahunPengalaman}, Aktif: ${saya.aktif}`);
console.log(`Target stack: ${["TypeScript", "Node.js", "DevOps", "AI Engineering"]}`);
console.log(`Status: ${taskStatus}`);

// Test narrowing
console.log("Process 'hello':", processInput("hello"));
console.log("Process 3.14159:", processInput(3.14159));

// Test discriminated union
handleResult({ status: "success", data: "Belajar TS selesai!" });