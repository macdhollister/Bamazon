# Bamazon

Bamazon is a simple CLI marketplace with functionality for customers, managers, and supervisors.

## Installing Bamazon

Bamazon uses mySQL to store data. In order to use Bamazon locally, you must first create a mySQL database through mySQL workbench.
Additionally, Bamazon requires a `.env` file in order to function properly. Each user must make this file themselves. An example of the format of this file is as follows.

```
# Bamazon database connections

HOST = localhost
PORT = 3306
USER = root
PASSWORD = (user specific password)
```

## Using Bamazon

To use Bamazon, run `node <command>` where the command is one of the following.

* bamazonCustomer.js
* bamazonManager.js
* bamazonSupervisor.js

### bamazonCustomer.js

The bamazon Customer interface will prompt users for what product and how many of it they wish to purchase.

### bamazonManager.js

The bamazon Manager interface will prompt users to view items for sale, view items that are in low stock, restock any existing items, or add a new item for sale.

### bamazonSupervisor.js

The bamazon Supervisor interface provides information regarding each store department in the database such as overhead costs and total profits. It also allows a supervisor to add new departments.
