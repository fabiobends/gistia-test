const fs = require("fs");
const { parse } = require("csv-parse");

async function question4() {
  const promise = () =>
    new Promise((resolve, reject) => {
      const arr = [];

      fs.createReadStream("gistia-test-dataset.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (csvrow) {
          const soldName = csvrow[0].toLowerCase();
          const purchasedName = csvrow[1].toLowerCase();
          // append the same name, it doesn't matter the order
          if (soldName > purchasedName) {
            arr.push(soldName + purchasedName);
          } else {
            arr.push(purchasedName + soldName);
          }
        })
        .on("end", function () {
          resolve(arr);
        })
        .on("error", function (err) {
          reject(err);
        });
    });

  const transactions = await promise();
  console.log("question 4: " + new Set(transactions).size);
}

module.exports = { question4 };
