const { getPool } = require("./helpers");

// const id = "1";
// const title = "test";
// getPool().query(
//   "INSERT INTO favorite (telegram_id, title) VALUES ($1, $2)",
//   [id, title],
//   (error, results) => {
//     if (error) {
//       console.log({ error });
//       throw error;
//     }
//     console.log({ results });
//   }
// );

// getPool().query("SELECT * FROM favorite", [], (error, results) => {
//   if (error) {
//     console.log({ error });
//     throw error;
//   }
//   console.log({ results });
// });

const query = (...args) =>
  new Promise((resolve, reject) => {
    getPool().query(...args, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });

module.exports = {
  query,
};
