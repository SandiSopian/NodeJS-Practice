const { MongoClient } = require("mongodb");
const ObjectID = require("mongodb").ObjectId;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017";
const dbName = "nodepractice";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("koneksi gagal!");
  }

  // Pilih database
  const db = client.db(dbName);

  // Menambahkan 1 data ke collection mahasiswa
  //   db.collection("mahasiswa").insertOne(
  //     {
  //       nama: "Ginyu",
  //       email: "waterbreath@gmail.com",
  //     },
  //     (error, result) => {
  //       if (error) {
  //         return console.log("gagal menambahkan data!");
  //       }

  //       console.log(result);
  //     }
  //   );

  // Menambahkan lebih dari 1 data
  //   db.collection("mahasiswa").insertMany(
  //     [
  //       { nama: "Kanao", email: "flowerbreath@gmail.com" },
  //       { nama: "Tanjiro", email: "sunbreath@gmail.com" },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         return console.log("data gagal ditambahkan");
  //       }

  //       console.log(result);
  //     }
  //   );

  // Menampilkan semua data di collection "mahasiswa"
  //   db.collection("mahasiswa")
  //     .find()
  //     .toArray((error, result) => {
  //       console.log(result);
  //     });
  // Menampilkan data berdasarkan kriteria di collection "mahasiswa"
  //   db.collection("mahasiswa")
  //     .find({ nama: "Ginyu" })
  //     .toArray((error, result) => {
  //       console.log(result);
  //     });

  // Mengubah data berdasarkan id
  //   const updatePromise = db.collection("mahasiswa").updateOne(
  //     {
  //       _id: ObjectID("625931b6c591ca0558e90b13"),
  //     },
  //     {
  //       $set: {
  //         email: "Kanao@gmail.com",
  //       },
  //     }
  //   );

  //   updatePromise
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  // Mengubah data lebih dari 1 data berdasarkan kriteria
  //   db.collection("mahasiswa").updateMany(
  //     {
  //       nama: "Kanao",
  //     },
  //     {
  //       $set: {
  //         nama: "Kanao Kamado",
  //       },
  //     }
  //   );

  //   // Menghapus 1 data
  //   db.collection("mahasiswa")
  //     .deleteOne({
  //       _id: ObjectID("625931b6c591ca0558e90b13"),
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  // Menghapus lebih dari 1 data
  db.collection("mahasiswa")
    .deleteMany({
      nama: "Tanjiro",
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
