// Bisa meng-export function
function cetakNama(nama) {
  return `Hallo, nama saya ${nama}`;
}

// Bisa meng-export variable
const PI = 3.14;

// Bisa meng-export object
const mahasiswa = {
  nama: "Rika",
  umur: "17",
  cetakMhs() {
    return `Hallo, my name is ${this.nama} I'am ${this.umur}`;
  },
};

// Bisa meng-export class
class Orang {
  constructor() {
    console.log("Object orang telah dibuat!");
  }
}

// cara export 1 per 1
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// cara export sekaligus
// module.exports = {
//   cetakNama: cetakNama,
//   PI: PI,
//   mahasiswa: mahasiswa,
//   Orang: Orang,
// };
// atau
module.exports = { cetakNama, PI, mahasiswa, Orang };
