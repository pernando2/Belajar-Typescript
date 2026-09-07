// ============ DAY 3: INTERFACE vs TYPE, FUNCTION TYPES, OPTIONAL/READONLY ============
// File: src/day3-interface-function.ts
// Cara: uncomment per bagian, pahami, cek: npm run typecheck

// ---------------------------------------------------------
// 1. INTERFACE vs TYPE ALIAS
// ---------------------------------------------------------

interface User {
  id: number;
  name: string;
  email: string;
}

// declaration merging - interface bisa ditambah lagi
interface User {
  phone?: string;
}

// interface bisa di-extend (bisa memakai interface lain)
interface Admin extends User {
  permissions: string[];
  isSuperAdmin?: boolean;
}

const userAdmin: Admin = {
  id: 1,
  name: "Nando",
  email: "[EMAIL_ADDRESS]",
  phone: "08123456789",
  permissions: ["create", "read", "update", "delete"],
  isSuperAdmin: true,
};
console.log(userAdmin);

// TYPE ALIAS untuk union / tuple / primitive / function
type role = "admin" | "editor" | "viewer"; // union literal type
type userTuple = [string, number]; // tuple type
type userID = number; // alias primitive
type fetchCallBack = (data: User) => void; // function type

// TYPE ALIAS untuk intersectioni (mirip extends pada interface)
type Timestamps = { createdAt: Date; updatedAt: Date };
type fullUser = User & Timestamps;

// ---------------------------------------------------------
// 2. FUNCTION TYPES
// ---------------------------------------------------------

// Function type via type alias
type MathOperation = (a: number, b: number) => number;

const tambah: MathOperation = (a, b) => a + b;
const kurang: MathOperation = (a, b) => a - b;
const kali: MathOperation = (a, b) => a * b;

// console.log(tambah(1, 2));
// console.log(kurang(1, 2));
// console.log(kali(1, 2));

// callback / higher-order function
function applyToArray(
  operation: MathOperation,
  [x, y] = [number, number],
): number {
  return operation(x, y);
}

console.log("10 + 5 =", applyToArray(tambah, [10, 5]));
console.log("10 * 5 =", applyToArray(kali, [10, 5]));

// optional parameter
type Logger = (message: string, level?: "info" | "warning" | "error") => void;

const log: Logger = (message, level = "info") => {
  console.log(`${level.toUpperCase()} - ${message}`);
};

log("User logged in");
log("Invalid password", "error");

// Rest parameter
function sumAll(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log("sum:", sumAll(1, 2, 3, 4, 5)); // 15

// void vs never
function logSomething(msg: string): void {
  console.log(msg);
}
function throwError(): never {
  throw new Error("Kesalahan fatal!");
}

// Function overloads
function double(input: number): number;
function double(input: string): string;
function double(input: number | string): number | string {
  return typeof input === "number" ? input * 2 : input + input;
}
console.log("double(5):", double(5)); // 10
console.log("double('a'):", double("a")); // "aa"

// ---------------------------------------------------------
// 3. OPTIONAL & READONLY
// ---------------------------------------------------------

interface ServerConfig {
  host: string;
  port: number;
  retries?: number; // optional
  readonly protocol: "http" | "https"; // readonly
  // readonly apiKey: ***     // readonly
}

const prodConfig: ServerConfig = {
  host: "db.prod.internal",
  port: 5432,
  protocol: "https",
  // apiKey: ***
};
// prodConfig.apiKey = "hacked"; // ERROR: readonly! (bagus utk keamanan)
// prodConfig.port = 3306;      // OK - not readonly

// Optional chaining + nullish coalescing
function getRetries(cfg: ServerConfig): number {
  return cfg.retries ?? 3; // default 3 kalau undefined
}
console.log("retries default:", getRetries({ ...prodConfig, retries: 5 })); // 5
console.log("retries fallback:", getRetries(prodConfig)); // 3 (karena tidak di-set)

// Readonly array (immutable data)
const APP_MODULES: readonly string[] = ["SPECTRA", "Inventory", "Quality"];
// APP_MODULES.push("NewModule"); // ERROR: readonly

// ---------------------------------------------------------
// 4. LATIHAN PRAKTIS (kerjakan!)
// ---------------------------------------------------------

/*
EXERCISE INI PERINTAHKAN BUAT TYPE-LEVEL DARI KONSEP SPECTRA-MU!
*/

// 1. Buat interface Reflects entitas SPECTRA 0utfit:
interface Area {
  intAreaID: number;
  txtAreaName: string;
  txtQRCode?: string;
  intIsActive: boolean;
}

// 2. Buat interface Consumable (optional status, readonly kode):
interface Consumable {
  intConsumableID: number;
  txtCode: string;
  txtName: string;
  txtStatus?: string;
  txtUnit?: string;
  readonly txtKodeProduk: string;
  intStock: number;
  intIsActive: boolean;
}

// 3. Buat union type untuk status CLI mirip status di SPECTRA

type CliStatus =
  | "pending"
  | "in_progress"
  | "user_completed"
  | "leader_completed"
  | "supervisor_completed";

// 4. Buat function type untuk validasi (mirip middleware rolespectra)
type RoleValidator = (userId: number, role: string) => boolean;

// 5. Gabungkan interface RiskWith optional photo:
interface DailyCheck {
  intDailyCheckID: number;
  dtmCheckDate: Date;
  intAreaID: number;
  intUserID: number;
  status: CliStatus;
  photoEvidence?: string; // optional
  readonly createdAt: Date; // readonly
  remarks?: string;
}

// ---------------------------------------------------------
// TEST RUNNER
// ---------------------------------------------------------

console.log("✅ Day 3 Interface/Type/Function practice loaded!");
console.log(
  "Interface + type alias + function types + optional & readonly siap!",
);
