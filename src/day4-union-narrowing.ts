import { error } from "node:console";

let usia: number | string;
usia = 26;
usia = "dua puluh enam";

// 2. LITERAL: buat tipe TaskState
type taskState = "Done" | "In Progress" | "Cancelled";

let task1: taskState = "Done";
task1 = "In Progress";
console.log("Task1:", task1);

// 3. NARROWING: buat fungsi yang menerima string|number
function processID(input: string | number) {
  if (typeof input === "number") {
    console.log("Processing number ID:", input);
    return input.toFixed(2);
  } else if (typeof input === "string") {
    console.log("Processing string ID:", input);
    return input.toUpperCase();
  } else throw error("Invalid ID");
}
processID(10);
processID("TEN");
processID(true);
