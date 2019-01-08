const mysql = require('mysql');
const inq = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'W@2blju&2ZXH&BkC6R51',
    database: 'bamazon'
});

const actions = ['View Product Sales by Department', 'Create New Department'];
inq.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: actions
    }
]).then(inqRes => {
    if (inqRes.action === actions[0]) {
        viewProfits();
    } else if (inqRes.action === actions[1]) {
        createDepartment();
    }
})

function createDepartment() {
    inq.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the new department called?'
        },
        {
            type: 'input',
            name: 'overhead',
            message: "What is this department's overhead?",
            validate: function validateQuantity(userInput) {
                return Number.isInteger(parseInt(userInput)) && parseInt(userInput) > 0;
            }
        }
    ]).then(inqRes => {
        const name = inqRes.departmentName;
        const overhead = inqRes.overhead;

        connection.query(`
        INSERT INTO
        departments(department_name, over_head_costs)
        VALUES
        (?, ?);
        `, [name, overhead], err => {
            if (err) throw err;
            connection.end();
        })
    })

}

function viewProfits() {
    connection.query(`
    SELECT 
    departments.*, 
    IFNULL(SUM(products.product_sales), 0) AS product_sales, 
    IFNULL((SUM(products.product_sales) - departments.over_head_costs), (0-departments.over_head_costs)) AS total_profit
    FROM
    departments LEFT JOIN products
    ON
    departments.department_name=products.department_name
    GROUP BY
    department_name;
    `, (err, sqlRes) => {
        if (err) throw err;
        console.table(sqlRes);
        connection.end();
    })
}