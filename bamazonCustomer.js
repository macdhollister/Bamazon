require('dotenv').config()

const mysql = require('mysql');
const inq = require('inquirer');

const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'bamazon'
});

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
                return Number.isInteger(parseInt(userInput)) && parseInt(userInput) > 0;
            }
        }
    ])
    .then(inqRes => {
        const product = sqlData[inqRes.selectionID];
        const itemPrice = product.price;
        const quantity = parseInt(inqRes.purchaseQuantity);
        const inStock = product.stock_quantity;

        if (quantity > inStock) {
            console.log("Sorry, we don't have that many in stock!");
        } else {
            console.log(`\nItem:\n${product.product_name}\n`);
            console.log(`Quantity ordered:\n${quantity}\n`);
            console.log(`Order Subtotal:\n${itemPrice * quantity}`);

            connection.query('UPDATE products SET stock_quantity = ?, product_sales = product_sales + ? WHERE item_id = ?',
            [inStock-quantity, itemPrice*quantity, product.item_id], err => {
                if (err) throw err;
                console.log('Your order is complete!');
                connection.end();
            })
        }
    })
})