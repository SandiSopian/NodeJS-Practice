// mengambil arguments dari command line arguments
const yargs = require("yargs");
const contacts = require("./contacts");

yargs
  .command({
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
  })
  .demandCommand();

// menampilkan daftar semua nama & no hp contact
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama & no hp contact",
  handler() {
    contacts.listContact();
  },
});

// menampilkan daftar semua nama & no hp contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail semua contact",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: "true",
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

// menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: "true",
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
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
