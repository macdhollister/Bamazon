const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'W@2blju&2ZXH&BkC6R51',
    database: 'bamazon'
});

connection.query(`SELECT * FROM departments WHERE department_name = ?`, ['Furniture2'], (err, sqlRes) => {
    if (err) throw err;

    console.table(sqlRes);

    connection.end();
})