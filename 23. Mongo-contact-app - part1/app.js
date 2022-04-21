const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

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
