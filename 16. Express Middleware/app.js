const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;

// setup package yang digunakan
app.set("view engine", "ejs");

// (1) Thrid-party middleware
app.use(expressLayouts);
app.use(morgan("dev"));

// (2) Built-in middleware
// membuat kita bisa mengakses file static lain yang ada di dalam folder public
app.use(express.static("public"));

// (3) Aplication level middleware
// membuat execute mencari perintah selanjutnya dengan memasukan parameter (next)
app.use((req, res, next) => {
  console.log("Time", Date.now());
  next();
});

// res.json untuk mengambalikan hasil berupa json
// res.sendFile untuk mengambalikan isi dari sebuah file
app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Sandi",
      email: "shuna@gmail.com",
    },
    {
      nama: "Rika",
      email: "rikachan@gmail.com",
    },
    {
      nama: "Doni",
      email: "doniggbang@gmail.com",
    },
  ];
  res.render("index", {
    mahasiswa,
    title: "Home",
    // menggunakan package express-ejs-layout agar
    layout: "layouts/main-layout",
  });
});
app.get("/about", (req, res) => {
  // res.send("Halaman about");
  res.render("about", { title: "Halaman about", layout: "layouts/main-layout" });
});
app.get("/contact", (req, res) => {
  // res.send("Halaman contact");
  res.render("contact", { title: "Halaman contact", layout: "layouts/main-layout" });
});

//res.params untuk merespon isi dari file
app.get("/product/:id/", (req, res) => {
  res.send(`Product ID : ${req.params.id} <br> Category : ${req.query.category}`);
});

// app.use untuk menangangani halaman yang tidak ada
app.use("/", (req, res) => {
  res.status(404);
  res.send("404 Page not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
