// Node Modules : Fungsionalitas yang simple ataupun kompleks yang tersimpan di dalam sebuah file javascript, yang dapat kita gunakan kembali pada aplikasi node js
// Setiap modul di dalam node js memiliki konteks-nya masing-masing, tidak bisa saling tercampur dengan modul lain pada lingkup global.

// const fs = require('fs'); // Core Module
// const cetakNama = require('./coba'); // Local Module
// const moment = require('moment'); // Third party module /  npm module / node module

const coba = require("./coba");

console.log(coba.cetakNama("Sandi"), coba.PI, coba.mahasiswa.cetakMhs, new coba.Orang());
