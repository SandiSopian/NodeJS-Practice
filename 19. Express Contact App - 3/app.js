const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require("./utils/contact");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// setup package yang digunakan
app.set("view engine", "ejs");

// (1) Thrid-party middleware
app.use(expressLayouts);

// (2) Built-in middleware
// membuat kita bisa mengakses file static lain yang ada di dalam folder public
app.use(express.static("public"));

// Built-n middleware untuk encoded url
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
  const contacts = loadContact();
  // res.send("Halaman contact");
  res.render("contact", {
    title: "Halaman contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

// Halaman form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layout",
  });
});

// Proses data contact
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "email tidak valid!").isEmail(),
    check("noHP", "no HP tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // kirimkan flash message
      req.flash("msg", "Data contact berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

// proses delete contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  // jika contact tidak ada
  if (!contact) {
    res.status(404);
    res.send("Error 404 Not Found");
  } else {
    deleteContact(req.params.nama);
    req.flash("msg", "Data contact berhasil dihapus!");
    res.redirect("/contact");
  }
});

// Halaman form ubah data contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// proses ubah data
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "email tidak valid!").isEmail(),
    check("noHP", "no HP tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContacts(req.body);
      // kirimkan flash message
      req.flash("msg", "Data contact berhasil diubah!");
      res.redirect("/contact");
    }
  }
);

// Halaman detail contact
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("detail", {
    title: "Halaman contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// app.use untuk menangangani halaman yang tidak ada
app.use("/", (req, res) => {
  res.status(404);
  res.send("404 Page not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
