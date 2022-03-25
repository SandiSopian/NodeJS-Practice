// Synchronous

// const getUserSync = (id) => {
//   const nama = id === 1 ? "Sandi" : "Sopian";
//   return { id, nama };
// };

// const userSatu = getUserSync(1);
// console.log(userSatu);

// const userDua = getUserSync(2);
// console.log(userDua);

// const Hallo = "Hello World!";
// console.log(Hello);

// Asynchronous

const getUser = (id, cb) => {
  const time = id === 1 ? 3000 : 2000;
  setTimeout(() => {
    const nama = id === 1 ? "Sandi" : "Sopian";
    cb({ id, nama });
  }, time);
};

const userSatu = getUserSync(1);
console.log(userSatu);

const userDua = getUserSync(2);
console.log(userDua);

const Hallo = "Hello World!";
console.log(Hello);
