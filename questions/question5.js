const fs = require("fs");
const { parse } = require("csv-parse");

async function question5() {
  const promise = () =>
    new Promise((resolve, reject) => {
      const map = new Map();

      fs.createReadStream("gistia-test-dataset.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (csvrow) {
          const account = csvrow[3];
          if (!map.has(account)) {
            map.set(account, 1);
          } else {
            const numberOfTransactions = map.get(account);
            map.set(account, numberOfTransactions + 1);
          }
        })
        .on("end", function () {
          resolve(map);
        })
        .on("error", function (err) {
          reject(err);
        });
    });

  const transactions = await promise();
  const accountsWithAtLeast500Transactions = Array.from(
    transactions.values()
  ).filter((value) => value >= 500);
  console.log("question 5: " + accountsWithAtLeast500Transactions.length);
}

module.exports = { question5 };
