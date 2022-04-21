const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// Setup method override
app.use(methodOverride("_method"));

// Setup EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
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

// Halaman Home
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

// Halaman About
app.get("/about", (req, res) => {
  // res.send("Halaman about");
  res.render("about", { title: "Halaman about", layout: "layouts/main-layout" });
});

// Halaman Contact
app.get("/contact", async (req, res) => {
  //   Contact.find().find((contact) => {
  //     res.send(contact);
  //   });

  const contacts = await Contact.find();

  //   const contacts = loadContact();
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

// Proses tambah data contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
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
      Contact.insertMany(req.body, (error, result) => {
        // kirimkan flash message
        req.flash("msg", "Data contact berhasil ditambahkan!");
        res.redirect("/contact");
      });
    }
  }
);

// proses delete contact
// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });
//   // jika contact tidak ada
//   if (!contact) {
//     res.status(404);
//     res.send("Error 404 Not Found");
//   } else {
//     Contact.deleteOne({ _id: contact._id }).then((result) => {
//       req.flash("msg", "Data contact berhasil dihapus!");
//       res.redirect("/contact");
//     });
//   }
// });

app.delete("/contact", (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash("msg", "Data contact berhasil dihapus!");
    res.redirect("/contact");
  });
});

// Halaman form ubah data contact
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// proses ubah data
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
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
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            noHP: req.body.noHP,
          },
        }
      ).then((result) => {
        // kirimkan flash message
        req.flash("msg", "Data contact berhasil diubah!");
        res.redirect("/contact");
      });
    }
  }
);

// Halaman detail contact
app.get("/contact/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("detail", {
    title: "Halaman contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});
