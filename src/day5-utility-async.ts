interface Sparepart {
  id: string;
  name: string;
  stock: number;
  location: string;
  lastMaintenance: Date;
}

// A. Partial<T> (Membuat Semua Properi Jadi Opsional)
// Partial<Sparepart> membuat id, name, stock, dll. menjadi optional (?)
type UpdateSparepartDto = Partial<Sparepart>;

function updatePart(id: string, updateData: UpdateSparepartDto) {
  console.log(`Mengubah data sparepart ${id}:`, updateData);
}

// Boleh hanya memperbarui stok saja
updatePart("PART-01", { stock: 50 });

// B. Omit<T, K> (Membuang Properti Tertentu)
// Mengambil semua properti Sparepart KECUALI 'id' dan 'lastMaintenance'
// type CreateSparepartDto = Omit<Sparepart, "id" | "lastMaintenance">;

// const newPart: CreateSparepartDto = {
//   name: "Bearing 6205",
//   stock: 100,
//   location: "Rack A-2",
// };

// C. Pick<T, K> (Mengambil Properti Tertentu Saja)
// Hanya mengambil 'id' dan 'name' untuk kebutuhan dropdown di UI
// type SparepartDropdown = Pick<Sparepart, "id" | "name">;

// const option: SparepartDropdown = {
//   id: "PART-01",
//   name: "Bearing 6205",
// };

// D. Readonly<T> (Objek Murni Imutabel / Tidak Bisa Diubah)
// type MachineConfig = Readonly<{
//   maxTemperature: number;
//   safetyMode: boolean;
// }>;

// const config: MachineConfig = {
//   maxTemperature: 85,
//   safetyMode: true,
// };

// config.maxTemperature = 90; // ERROR di AntiGravity! Properti ini Readonly.

// E. Record<K, T> (Membuat Mapping Key-Value yang Rapi)
// type MachineStatus = "RUNNING" | "STOPPED" | "MAINTENANCE";

// Key harus bertipe MachineStatus, dan Valuenya harus bertipe string
// const StatusDescription: Record<MachineStatus, string> = {
//   RUNNING: "Mesin sedang beroperasi normal",
//   STOPPED: "Mesin berhenti/standby",
//   MAINTENANCE: "Mesin dalam perbaikan rutin",
// };

// 2. Async/Await dengan Strong Typing
// Model Data Response
interface TelemetryData {
  deviceId: string;
  temperature: number;
  timestamp: Date;
}

// Simulasi mengambil data dari sensor IoT (Database/API call)
// Fungsi async WAJIB mengembalikan Promise<TelemetryData>
async function fetchSensorTelemetry(deviceId: string): Promise<TelemetryData> {
  // Simulasi async delay 1 detik
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    deviceId: deviceId,
    temperature: 41.8,
    timestamp: new Date(),
  };
}

// Menjalankan fungsi Async dengan Try-Catch
async function runDiagnostic() {
  try {
    console.log("[INFO] Mengambil data telemetry sensor...");

    // TS otomatis tahu bahwa 'data' bertipe TelemetryData
    const data = await fetchSensorTelemetry("SENSOR-LINE-01");

    console.log(
      `[OK] Device ${data.deviceId} Suhu: ${data.temperature}°C `,
      data.timestamp,
    );
  } catch (error) {
    console.error("[ERROR] Gagal mengambil telemetry:", error);
  }
}

runDiagnostic();

// Praktek Async/Await
// Model Data User Profile
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  passwordHash?: string;
}

// DTO (Data Transfer Object)
type CreateUserProfileDto = Omit<UserProfile, "role">;
type UpdateUserProfileDto = Partial<CreateUserProfileDto>;
type UserResponseDto = Omit<UserProfile, "passwordHash">;

// Fungsi async untuk register user
async function registerUser(
  input: CreateUserProfileDto,
): Promise<UserResponseDto> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: "USR-001",
    name: input.name,
    email: input.email,
    role: "OPERATOR",
  };
}

async function UpdateProfile(
  input: UpdateUserProfileDto,
): Promise<UserResponseDto> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulasi data user yang sudah ada di database
  const currentUser = {
    name: "John Doe",
    email: "testing@gmail.com",
  };

  return {
    id: "USR-001",
    // Gunakan nullish coalescing (??) agar jika undefined, tetap menghasilkan string
    name: input.name ?? currentUser.name,
    email: input.email ?? currentUser.email,
    role: "OPERATOR",
  };
}

async function runRegisterUser() {
  try {
    console.log("[INFO] Mendaftarkan user...");

    // TS otomatis tahu bahwa 'data' bertipe TelemetryData
    const data = await registerUser({
      id: "001",
      name: "John Doe",
      email: "testing@gmail.com",
    });

    console.log(
      `[OK] User ${data.id} ${data.name} email: ${data.email} role: ${data.role}`,
    );
  } catch (error) {
    console.error("[ERROR] Gagal mengambil telemetry:", error);
  }
}

async function runUpdateProfile() {
  try {
    console.log("[INFO] Mengupdate user...");

    // TS otomatis tahu bahwa 'data' bertipe TelemetryData
    const data = await UpdateProfile({
      name: "John Doe Updated",
      email: "updated@gmail.com",
    });

    console.log(
      `[OK] User ${data.id} ${data.name} email: ${data.email} role: ${data.role}`,
    );
  } catch (error) {
    console.error("[ERROR] Gagal mengupdate user:", error);
  }
}

runRegisterUser();
runUpdateProfile();
