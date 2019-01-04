const mysql = require('mysql');
const inq = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'W@2blju&2ZXH&BkC6R51',
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;

    function printInventory() {
        const query = connection.query('SELECT item_id, product_name, price, stock_quantity FROM products', (err, res) => {
            if (err) throw err;
            console.table(res);
        })
    }
    printInventory();








    connection.end();
})