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

const actionChoices = [
    'View Products for Sale',
    'View Low Inventory Products',
    'Restock Existing Product',
    'Add New Product'
]

inq.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: actionChoices
    }
]).then(inqRes => {
    const action = inqRes.action;
    const choiceIndex = actionChoices.indexOf(action);

    if (choiceIndex === 0) {
        printInventory();
    } else if (choiceIndex === 1) {
        printLowInventory();
    } else if (choiceIndex === 2) {
        addInventory();
    } else if (choiceIndex === 3) {
        addNewItem();
    }
})

function printInventory() {
    const query = connection.query('SELECT item_id, product_name, department_name, price, stock_quantity FROM products', (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    connection.end();
}

function printLowInventory() {
    const query = connection.query(
        `SELECT item_id, product_name, department_name, stock_quantity 
        FROM products 
        WHERE stock_quantity < 5`,
        (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    connection.end();
}

function addInventory() {
    let ids = [];

    connection.query('SELECT item_id, product_name, stock_quantity FROM products', (err, sqlRes) => {
        for (let i = 0; i < sqlRes.length; i++) {
            ids.push(''+sqlRes[i].item_id);
        }

        console.table(sqlRes);

        inq.prompt([
            {
                type: 'list',
                name: 'selectionID',
                message: "Select an item's ID to add intentory to it",
                choices: ids
            },
            {
                type: 'input',
                name: 'quantityAdded',
                message: 'How many would you like to add? (enter a number)',
                validate: function validateQuantity(userInput) {
                    return Number.isInteger(parseInt(userInput)) && parseInt(userInput) > 0;
                }
            }
        ])
        .then(inqRes => {
            connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?', 
            [inqRes.quantityAdded, inqRes.selectionID], err => {
                if (err) throw err;
                printInventory();
            })
        })
    })
}

function addNewItem() {
    inq.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'What item would you like to add?'
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'What department is the item in?'
        },
        {
            type: 'input',
            name: 'price',
            message: 'What is the price of the item?',
            validate: isNumber
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'How many would you like to put in stock?',
            validate: isNumber
        }
    ])
    .then(inqRes => {
        connection.query('INSERT INTO products SET ?', inqRes, err => {
            if (err) throw err;
            printInventory();
        })
    })
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}