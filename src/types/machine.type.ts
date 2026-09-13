// Define Status Enum/Union
export type MachineStatus = "RUNNING" | "STOPPED" | "MAINTENANCE";

// Base Model Data
export interface MachineData {
  id: string;
  name: string;
  operatingHours: number;
  status: MachineStatus;
}

// DTO Menggunakan Utility Types
export type CreateMachineDto = Omit<MachineData, "id">;
export type MachineSummary = Pick<MachineData, "id" | "name" | "status">;
