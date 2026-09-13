"use strict";
// ============ DAY 2: TYPESCRIPT DASAR — 20 SOAL LATIHAN ============
// File: src/day2-basic-types-practice.ts
// Cara: Uncomment soal per soal, ketik jawaban, cek: npm run typecheck
// Target: SEMUA soal lolos strict mode tanpa error!
Object.defineProperty(exports, "__esModule", { value: true });
// ---------------------------------------------------------
// SOAL 1-5: PRIMITIVE TYPES
// ---------------------------------------------------------
// SOAL 1: Deklarasikan variable dengan type annotation
// string  -> teks/karakter, nilai DENGAN QUOTES ("...")
let namaLengkap = "Nando";
// number  -> angka (integer & desimal)
let umur = 28;
// number  -> bisa juga number desimal
let tinggiBadan = 170.5;
// boolean -> true / false (true=saiahan, false=handan)
let sudahMenikah = false;
// null    -> kosong, nol; deliberately "no value"
let hobi = null; // nullable
console.log(namaLengkap);
console.log(umur);
console.log(tinggiBadan);
console.log(sudahMenikah);
console.log(hobi);
// SOAL 2: Type inference vs annotation — perbaiki yang error
// Type inference -> TS automatic kenali tipe dari nilai awal
let kota = "Jakarta"; // inference: string
kota = "123"; // ERROR: Type 'number' not assignable to 'string'
console.log(kota);
// SOAL 3: any vs unknown — mana yang lebih safe?
// any     -> kerenyana tipe apa saja, TIDAK ada type check (dangerous)
let dataAny = "hello";
dataAny = 123;
dataAny = true;
dataAny.apaSajaBisa(); // No error tapi dangerous!
console.log(dataAny);
// unknown -> kerenyana tipe apa saja, SERI NARROWING sebelum digunakan (safe)
let dataUnknown = "hello";
dataUnknown = 123;
// dataUnknown.toUpperCase(); // ERROR: need type narrowing
dataUnknown.toUpperCase();
// LEBIH AMAN UNKNOWN
// SOAL 4: void, never, undefined, null
// void     -> function yang KEBULI konte, tanpa return value
function logPesan(pesan) { console.log(pesan); }
// never    -> function yang NOLONGERE bisa return (throw / infinite loop)
function errorSelalu() { throw new Error("Selalu error"); }
function takKembali() { while (true) { } }
// undefined -> variable sudah deklarasi, nilai masih belum di-set
let kosong = undefined;
// null     -> nol, kosong
let nol = null;
logPesan("Hello");
console.log(kosong);
console.log(nol);
errorSelalu();
takKembali();
// SOAL 5: Literal types
// Literal type -> nilai string yang konkreto, hanya 3 pilihan
let status = "pending";
status = "success"; // OK
// status = "loading"; // ERROR
console.log(status);
// statstatus = "loading" di baris atas karena ketika set variabel status
// tidak ada pilihan "loading", maka menghasilkan error;
// ---------------------------------------------------------
// SOAL 6-10: ARRAY & TUPLE
// ---------------------------------------------------------
// SOAL 6: Array homogeneous
// number[]        -> array yang itemnya SEMUA number
let angka = [1, 2, 3];
// string[]        -> array yang itemnya SEMUA string
let nama = ["a", "b"];
// union array     -> array yang itemnya bisa string ATAU number
let campur = [1, "dua", 3]; // union array
console.log(angka);
console.log(nama);
console.log(campur);
// SOAL 7: Readonly array
// readonly array -> array yang hanya bisa dibaca, TIDAK bisa diubah (push/pop/assign)
const readonlyArr = [1, 2, 3];
// readonlyArr.push(4); // ERROR: property 'push' does not exist
// KODE DIATAS MENGHASILKAN ERROR KETIKA PUSH KARENA ARRAYNYA BERSIFAT READONLY (TIDAK BISA DIUBAH)
// readonlyArr[0] = 5; // ERROR: property '0' does not exist
console.log(readonlyArr);
// SOAL 8: Tuple — urutan & panjang tetap
// tuple -> array yang panjangnya FIXED, itemnya berbeda tipe, di urutan yang tetap
let biodata = ["Nann", 28, true];
biodata[0] = "Nando"; // OK
// biodata[1] = "dua puluh delapan"; // ERROR KARENA TIDAK SESUAI DENGAN TIPE DATA (HARUS NUMBER)
// biodata[3] = "tambah"; // ERROR KARENA INDEX TUPLE HANYA SAMPAI 2 ( INDEXNYA 0, 1, 2) PADA DEKLARASI TUPLE DI ATAS
console.log(biodata);
// SOAL 9: Tuple optional & rest
// optional tuple -> element bisa diskip, menggunaakna ? (number?)
let opsional = ["satu"]; // OK
// rest tuple     -> element rest, jumlahnya bisa bebanse ( ...number[] )
let restTuple = ["prefix", 1, 2, 3];
opsional.push(4); // ERROR: tuple length 2
restTuple.push(4); // OK: rest array bisa ditambah
console.log(opsional);
console.log(restTuple);
// SOAL 10: Array methods dengan type safety
const numbers = [1, 2, 3, 4, 5];
// map -> iterasi item di kali 2, hasilnya array baru
const doubled = numbers.map(n => n * 2); //iterasi item di kali 2, hasilnya array baru
// filter -> iterasi item di filter, hasilnya array baru
const filtered = numbers.filter(n => n > 2); //iterasi item di filter, hasilnya array baru
// reduce -> iterasi item dijumlahkan, hasilnya number
const sum = numbers.reduce((a, b) => a + b, 0); //iterasi item dijumlahkan, hasilnya number
// find -> bisa undefined! (number | undefined)
const found = numbers.find(n => n === 3); // bisa undefined!
console.log(numbers);
console.log(doubled);
console.log(filtered);
console.log(sum);
console.log(found);
const cfg = { apiUrl: "https://api.com", version: "1.0" };
cfg.timeout = 5000; // OK
const scores = { math: 90, english: 85 };
scores["science"] = 95; // OK KARENA MENGGUNAKAN KEY STRING SEPERTI DEKLARASI
console.log(scores);
const orang = {
    name: "Nann",
    address: {
        city: "Jakarta",
        zipCode: "12345"
    }
};
console.log(orang);
const calc = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};
console.log(calc);
let userId = "USR-001";
userId = 12345; // OK
// userId = true; // ERROR KARENA TRUE TIDAK SAMA DENGAN STRING ATAU NUMBER
console.log(userId);
const p = { name: "Nann", age: 28 };
console.log(p);
// SOAL 18: Type narrowing dengan typeof
// type narrowing -> narrows tipe yang union menjadi tipe yang konkret sebelum digunakan
function printId(id) {
    if (typeof id === "string") {
        console.log(id.toUpperCase()); // id is string
    }
    else {
        console.log(id.toFixed(2)); // id is number
    }
}
printId("hello");
printId(123);
function move(animal) {
    if ("fly" in animal) {
        animal.fly(); // animal is Bird
    }
    else {
        animal.swim(); // animal is Fish
    }
}
// SOAL 20: Type narrowing dengan instanceof
// narrowing instanceof -> cek class instance untuk narrows tipe union
function logError(err) {
    if (err instanceof Error) {
        console.log(err.stack); // err is Error
    }
    else {
        console.log(err.toUpperCase()); // err is string
    }
}
/*
BONUS 2: Buat function `formatProduct` yang menerima Product
dan return string: "[CATEGORY] NAME - RpPRICE (DISCOUNT% off)"
handle discount yang optional!
*/
function formatProduct(product) {
    return `${product.category} ${product.name} - Rp${product.price} (${product.discount ?? "Tidak ada diskon"})`;
}
// ---------------------------------------------------------
// TEST RUNNER — JANGAN DIHAPUS
// ---------------------------------------------------------
console.log("✅ Day 2 Basic Types Practice loaded!");
console.log("Uncomment soal per soal, ketik jawaban, lalu: npm run typecheck");
console.log("Target: 20 soal + 2 bonus lolos strict mode!");
//# sourceMappingURL=day2-basic-types-practice.js.map