// mengambil arguments dari command line arguments
const yargs = require("yargs");
const contacts = require("./contacts");

yargs.command({
  command: "add",
  describe: "Menambahkan contact baru",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: "true",
      type: "string",
    },
    email: {
      describe: "Masukan alamat Email",
      demandOption: "false",
      type: "string",
    },
    noHP: {
      describe: "Masukan no Hp",
      demandOption: "true",
      type: "string",
    },
  },
  handler(argv) {
    contacts.simpanContact(argv.nama, argv.email, argv.noHP);
  },
});

yargs.parse();

// const contacts = require("./contacts");

// const main = async () => {
//   const nama = await contacts.tulisPertanyaan("Masukan nama anda: ");
//   const email = await contacts.tulisPertanyaan("Masukan email anda: ");
//   const noHP = await contacts.tulisPertanyaan("Masukan no Hp anda: ");

//   contacts.simpanContact(nama, email, noHP);
// };

// main();
