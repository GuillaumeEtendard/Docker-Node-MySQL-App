const express = require('express')
const mysql = require('mysql2');
const app = express()
const port = 5000
const hostname = '0.0.0.0';

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: 3307,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect();

const createTableQuery = 'CREATE TABLE IF NOT EXISTS hits(id int AUTO_INCREMENT, hits INTEGER, PRIMARY KEY(id))';
const insertTableQuery = 'INSERT INTO hits (hits) VALUES (0)'
const selectTableQuery = 'SELECT * FROM hits LIMIT 1'
const incrementTableQuery = 'UPDATE hits SET hits = hits + 1 LIMIT 1'

connection.query(createTableQuery, function (err, result) {
  if (err) throw err;
  console.log("Table created", result);
  connection.query(insertTableQuery, function (err, result) {
    if (err) throw err;
    console.log("Record inserted");
  });
})

app.get('/', async (req, res) => {
  connection.query(incrementTableQuery)

  connection.query(selectTableQuery, function (err, result) {
    if (err) throw err;
    res.send('Hello World! ' + result[0].hits)
  })
})

app.listen(port, hostname, () => {
  console.log(`App listening at http://localhost:${port}`)
})