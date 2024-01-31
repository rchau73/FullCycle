const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: '12345@net',
    database: 'nodedb'
};

const mysql = require('mysql2');
const connection = mysql.createConnection(config);

connection.connect((err) => {
    console.error('Error connecting to MySQL:', err);
    return;
})
console.log('Connected to MySQL server');

const sqlInsert = `INSERT INTO people(name) values ('Roberto Chaú')`;
connection.query(sqlInsert);
console.log('Insert executed!');

let htmlPage = '<h1>FullCycle Rocks!</h1>'

const sqlSelect = `SELECT name FROM people`
connection.query(sqlSelect, function (err, result, fields) {
    if (err) throw err;
    let htmlResult = `${htmlPage}<ul>`;
    for (let i in result) {
        htmlResult += `<li>${result[i].name}</li>`;
    }
    htmlResult += '</ul>';
    htmlPage = htmlResult;
})

console.log('Select executed!');
console.log(htmlPage);
connection.end();

app.get('/', (req, res) => {
    res.send(htmlPage);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})