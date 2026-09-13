"use strict";
// TYPE DATA BASICS
Object.defineProperty(exports, "__esModule", { value: true });
// primitive types ( string, number, boolean, array, tuple )
let nama = "Nann";
let umur = 28;
let isDeveloper = true;
let hobi = ["coding", "olahraga", "ngopi"];
// tuple (array panjang & tipe tetap)
let biodata = ["Nann", 28, true];
const saya = {
    nama: "Nann",
    stack: ["Laravel", "PHP", "MySQL"],
    tahunPengalaman: 5,
    aktif: true
};
let taskStatus = "pending";
taskStatus = "in_progress"; // OK
// taskStatus = "cancelled"; // ERROR: Type '"cancelled"' not assignable
// Generics dasar
function firstElement(arr) {
    return arr[0];
}
const angka = firstElement([1, 2, 3]); // number
const huruf = firstElement(["a", "b", "c"]); // string
// ============ TYPE NARROWING ============
function processInput(input) {
    if (typeof input === "string") {
        return input.toUpperCase(); // TS tau ini string
    }
    return input.toFixed(2); // TS tau ini number
}
function handleResult(result) {
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
//# sourceMappingURL=index.js.map