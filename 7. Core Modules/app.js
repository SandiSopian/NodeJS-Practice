// Kunjungi NODEJS CORE MODULES - http://nodejs.org/dist/latest-v16.x/docs/api/

// Core Module
// File System
const fs = require("fs");

// contoh core module untuk menuliskan string ke file (Synchronous)
// menggunakan try and catch untuk menampilkan error
// try {
//   fs.writeFileSync("data/text.txt", "Hello world secara synchronous!");
// } catch (e) {
//   console.log("e");
// }

// contoh core module untuk menuliskan string ke file (Asynchronous)
// fs.writeFile("data/test.txt", "Hello world secara synchronous!", (e) => {
//   console.log("e");
// });

// contoh core module membaca isi file (Synchronous)
// const data = fs.readFileSync("data/test.text", "utf-8");
// console.log(data);

// contoh core module membaca isi file (Asynchronous)
// fs.readFile("data/test.text", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// contoh Readline (pertanyaan)
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Masukan nama anda: ", (nama) => {
//   rl.question("Masukan no HP anda : ", (noHP) => {
//     console.log(`Terimakasih ${nama}, sudah menginputkan ${noHP}`);
//     rl.close();
//   });
// });

// Mambuat app sederhana untuk memasukan kontak kedalam JSON
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// membuat pertanyaan
rl.question("Masukan nama anda: ", (nama) => {
  rl.question("Masukan no HP anda : ", (noHP) => {
    const contact = { nama, noHP };
    // membaca inputan
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);

    contacts.push(contact);
    // menulis inputan ke file
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

    console.log("Terimakasih sudah memasukan data anda.");
    rl.close();
  });
});
