const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/nodepractice", {
  userNewUrlParser: true,
  userUnifiedTopology: true,
  userCreateIndex: true,
});

// // Menambah 1 data
// const contact1 = new Contact({
//   nama: "Juni",
//   noHP: "0821144455",
//   email: "juni@gmail.com",
// });

// // Simpan ke collection
// contact1.save().then((contact) => console.log(contact));
