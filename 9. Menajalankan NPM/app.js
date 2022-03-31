const validator = require("validator");
const chalk = require("chalk");

// console.log(validator.isEmail("Shunasand@gmail.com"));
// console.log(validator.isMobilePhone("0821188501", "id-ID"));

const pesan = chalk`Lorem, ipsum dolor sit amet {bgRed.bold.black consectetur adipisicing elit.}  Quibusdam sint ex {bgWhite.italic.black possimus enim tenetur voluptate aperiam reiciendis eveniet voluptatibus} porro.`;
console.log(pesan);
