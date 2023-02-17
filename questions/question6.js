const fs = require("fs");
const { parse } = require("csv-parse");

async function question6() {
  const promise = () =>
    new Promise((resolve, reject) => {
      const map = new Map();

      fs.createReadStream("gistia-test-dataset.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (csvrow) {
          const account = csvrow[3];
          const amountValue = csvrow[2];
          if (!map.has(account)) {
            // it is an array with '0' as amount in dollars
            // and '1' number of transactions
            const arr = [];
            arr[0] = Number(amountValue);
            arr[1] = 1; // first transaction
            map.set(account, arr);
          } else {
            const arr = map.get(account);
            arr[0] += Number(amountValue);
            arr[1]++;
            map.set(account, arr);
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
  const highestAverages = Array.from(transactions.values())
    .map((value) => value[0] / value[1])
    .sort((a, b) => a > b);
  let account = "";
  transactions.forEach((value, key) => {
    if (value[0] / value[1] === highestAverages[2]) {
      account = key;
    }
  });
  console.log("question 6: " + account);
}

module.exports = { question6 };
