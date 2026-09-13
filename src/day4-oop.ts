// A. Basic Class, Access Modifiers, & Implement Interface

// 1. Interface sebagai Kontrak
interface IProductionMachine {
  machineId: string;
  startMachine(): void;
  stopMachine(): void;
}

// 2. Class mengimplementasikan Interface
class ProductionMachine implements IProductionMachine {
  // Parameter Properties: otomatis membuat variabel private & protected
  constructor(
    public machineId: string, // Bisa dibaca bebas dari luar
    protected lineName: string, // Cuma bisa dibaca class ini & turunannya
    private secretOperatingPin: number, // Benar-benar privat untuk class ini
  ) {}

  public startMachine(): void {
    if (this.verifyPin()) {
      console.log(
        `[OK] Mesin ${this.machineId} di Line ${this.lineName} BERJALAN.`,
      );
    } else {
      console.log(`[FAIL] PIN Salah! Gagal menjalankan mesin.`);
    }
  }

  public stopMachine(): void {
    console.log(`[STOP] Mesin ${this.machineId} DIPERHENTIKAN.`);
  }

  // Method privat hanya untuk internal class
  private verifyPin(): boolean {
    return this.secretOperatingPin === 1234; // Contoh verifikasi sederhana
  }
}

// Pengujian Class
const cncMachine = new ProductionMachine("CNC-01", "Line A", 1234);

console.log(cncMachine.machineId); // BISA: public
cncMachine.startMachine(); // BISA: public method
cncMachine.stopMachine(); // BISA: public method

// cncMachine.secretOperatingPin;  // ERROR di AntiGravity! Properti 'secretOperatingPin' private.
// cncMachine.lineName;            // ERROR di AntiGravity! Properti 'lineName' protected.

// B. Inheritance (Pewarisan) & Abstract Class

// Abstract Class sebagai Cetak Biru Perangkat IoT Pabrik
abstract class IoTDevice {
  constructor(
    public deviceId: string,
    protected ipAddress: string,
  ) {}

  // Normal Method (punya isi/logika dasar)
  public getInfo(): string {
    return `Device ID: ${this.deviceId} (${this.ipAddress})`;
  }

  // Abstract Method (TANPA isi): Wajib di-override/diisi oleh class turunan!
  abstract readSensorData(): void;
}

// Class Turunan 1: Sensor Suhu
class TemperatureSensor extends IoTDevice {
  constructor(
    deviceId: string,
    ipAddress: string,
    public currentTemp: number,
  ) {
    super(deviceId, ipAddress); // Memanggil constructor class induk (IoTDevice)
  }

  // Wajib mengimplementasikan abstract method 'readSensorData'
  readSensorData(): void {
    console.log(
      `[TEMP SENSOR] ${this.deviceId} di ${this.ipAddress} -> Suhu saat ini: ${this.currentTemp}°C`,
    );
  }
}

// Class Turunan 2: Sensor Tekanan (Pressure)
class PressureSensor extends IoTDevice {
  constructor(
    deviceId: string,
    ipAddress: string,
    public pressureBar: number,
  ) {
    super(deviceId, ipAddress);
  }

  readSensorData(): void {
    console.log(
      `[PRESSURE SENSOR] ${this.deviceId} -> Tekanan: ${this.pressureBar} Bar`,
    );
  }
}

// Penggunaan Abstract Class & Inheritance
// const device = new IoTDevice("DEV-00", "127.0.0.1"); // ERROR! Abstract class tidak bisa di-'new'

const tempSensor = new TemperatureSensor("TEMP-01", "192.168.1.50", 42.5);
const pressSensor = new PressureSensor("PRESS-01", "192.168.1.51", 3.8);

console.log(tempSensor.getInfo()); // Menggunakan method dari class induk
tempSensor.readSensorData(); // Menggunakan method buatan sendiri

pressSensor.readSensorData();

// Interface untuk entitas User Manufaktur
interface User {
  id: string;
  name: string;
  role: "OPERATOR" | "SUPERVISOR" | "MANAGER" | "ENGINEER";
  plantId: string;
}

// 1. Abstract Class BaseRepository<T>
abstract class BaseRepository<T> {
  // Method abstract yang harus diimplementasikan oleh subclass
  abstract findById(id: string): T | undefined;
  abstract save(data: T): boolean;
  abstract update(id: string, entity: T): boolean;
  abstract delete(id: string): boolean;
  abstract findAll(): T[];
}

// 2. Subclass UserRepository
class UserRepository extends BaseRepository<User> {
  // Simulasi database in-memory
  private users: Map<string, User> = new Map();

  // Implementasi method findById
  findById(id: string): User | undefined {
    return this.users.get(id);
  }

  // Implementasi method save
  save(data: User): boolean {
    if (!data.id) {
      return false;
    }
    this.users.set(data.id, data);
    return true;
  }

  update(id: string, entity: User): boolean {
    if (!this.users.has(id)) {
      return false;
    }
    this.users.set(id, entity);
    return true;
  }

  delete(id: string): boolean {
    if (!this.users.has(id)) {
      return false;
    }
    this.users.delete(id);
    return true;
  }

  findAll(): User[] {
    throw new Error("Method not implemented.");
  }
}

// --- Contoh Penggunaan (Simulasi Data User Manufaktur) ---

const userRepo = new UserRepository();

// 1. Simpan data user manufaktur
const newUser: User = {
  id: "USR-001",
  name: "Budi Santoso",
  role: "OPERATOR",
  plantId: "PLANT-CIBITUNG-01",
};

const updateUser: User = {
  id: "USR-001",
  name: "Budi Santoso Edit",
  role: "OPERATOR",
  plantId: "PLANT-CIBITUNG-01",
};

const isSaved = userRepo.save(newUser);
console.log(`Status Simpan: ${isSaved ? "Berhasil" : "Gagal"}`); // Status Simpan: Berhasil
const foundUser = userRepo.findById("USR-001");
console.log("Data User Ditemukan:", foundUser);

const updateStatus = userRepo.update("USR-001", updateUser);
console.log(`Status Update: ${updateStatus ? "Berhasil" : "Gagal"}`); // Status Update: Berhasil
const foundUser2 = userRepo.findById("USR-001");
console.log("Update Data User Ditemukan:", foundUser2);

const deleteStatus = userRepo.delete("USR-001");
console.log(`Status Delete: ${deleteStatus ? "Berhasil" : "Gagal"}`); // Status Delete: Berhasil

const findUser3 = userRepo.findById("USR-001");
console.log("Cari User 3:", findUser3);

const getAllUser = userRepo.findAll();
console.log("Semua User:", getAllUser);