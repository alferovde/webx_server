const express = require("express");
const mysql = require("mysql");
const PORT = 8080;

const connection = mysql.createConnection({
  host: "188.127.239.144",
  user: "welbex",
  password: "Jnrhsnbt1984!",
  database: "welbex",
});

const server = express();

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
});
server.get("/", (req, res) => {
  console.log(req.query);

  let con1 = Object.keys(req.query)[0];
  let con2 = Object.keys(req.query)[1];
  let con3 = Object.keys(req.query)[2];

  let filterCol = req.query[con1];
  let filterCondition = req.query[con2];
  let textValue = "";
  if (filterCondition === "LIKE") {
    textValue = "%" + req.query[con3] + "%";
  } else {
    textValue = req.query[con3];
  }

  let query = `SELECT * FROM welbex WHERE ${filterCol} ${filterCondition} '${textValue}' `;

  connection.query(query, (err, data) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  });
});

server.listen(PORT, () => {
  console.log("server work");
});
