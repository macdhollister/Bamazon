const mysql = require('mysql');
const inq = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'W@2blju&2ZXH&BkC6R51',
    database: 'bamazon'
});

// List a set of menu options:

// View Products for Sale
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

// View Low Inventory
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

// Add to Inventory
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

// Add New Product
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.