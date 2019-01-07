const mysql = require('mysql');
const inq = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'W@2blju&2ZXH&BkC6R51',
    database: 'bamazon'
});

connection.connect();

function printInventory() {
    const query = connection.query('SELECT item_id, product_name, price, stock_quantity FROM products', (err, res) => {
        if (err) throw err;
        console.table(res);
    })
}
printInventory();

const query = connection.query('SELECT * FROM products', (err, sqlRes) => {
    if (err) throw err;

    const sqlData = {};
    for (let i = 0; i < sqlRes.length; i++) {
        sqlData[sqlRes[i].item_id] = sqlRes[i];
    }

    const ids = Object.keys(sqlData);

    inq.prompt([
        {
            type: 'list',
            name: 'selectionID',
            message: "Select an item's id to purchase it!",
            choices: ids
        },
        {
            type: 'input',
            name: 'purchaseQuantity',
            message: 'How many would you like to buy? (enter a number)',
            validate: function validateQuantity(userInput) {
                return Number.isInteger(parseInt(userInput));
            }
        }
    ])
    .then(function(inqRes) {
        const selection = sqlData[inqRes.selectionID];
        console.log(selection.product_name);
    })
})

connection.end();