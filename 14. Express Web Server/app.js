const express = require("express");
const app = express();
const port = 3000;

// res.json untuk mengambalikan hasil berupa json
// res.sendFile untuk mengambalikan isi dari sebuah file
app.get("/", (req, res) => {
  // res.json({
  //   nama: "Sandi",
  //   email: "sandi@gmail.com",
  //   noHP: "085454546755",
  // });
  res.sendFile("./index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  // res.send("Halaman about");
  res.sendFile("./about.html", { root: __dirname });
});
app.get("/contact", (req, res) => {
  // res.send("Halaman contact");
  res.sendFile("./contact.html", { root: __dirname });
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

// const http = require("http");
// const fs = require("fs");

// const port = 3000;

// const renderHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write("Error: file not found");
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });

//     const url = req.url;

//     switch (url) {
//       case "/about":
//         renderHTML("./about.html", res);
//         break;
//       case "/contact":
//         renderHTML("./contact.html", res);
//         break;
//       default:
//         renderHTML("./index.html", res);
//         break;
//     }
//   })
//   .listen(port, () => {
//     console.log(`Server is listening on port ${port}..`);
//   });

// // const http = require("http");

// // http
// //   .createServer((req, res) => {
// //     res.write("Hello World!");
// //     res.end();
// //   })
// //   .listen(3000, () => {
// //     console.log("Server is listening on port 3000..");
// //   });
