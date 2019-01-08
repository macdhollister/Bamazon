DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INTEGER,
    product_sales DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY(item_id)
);

INSERT INTO 
products(product_name, department_name, price, stock_quantity, product_sales) 
VALUES
("Deep Learning: A Practitioner's Approach", "Books", 12.15, 36, 0),
("Marvel's Spider-Man", "Video Games", 39.99, 98, 0),
("The Adventure Zone: Murder on the Rockport Limited!", "Books", 17.99, 100, 0),
("Red Dead Redemption 2", "Video Games", 59.88, 33, 0),
("PHP & MySQL: Server-side Web Development", "Books", 38.25, 1, 0),
("God of War", "Video Games", 39.96, 145, 0),
("Shadow of the Colossus", "Video Games", 19.93, 5, 0),
("Nintendo Switch", "Video Game Consoles", 299.00, 164, 0),
("Nintendo Selects: The Legend of Zelda Ocarina of Time 3D", "Video Games", 18.50, 2, 0),
("Assassin's Creed Odyssey", "Video Games", 29.99, 131, 0);

DROP TABLE IF EXISTS departments;
CREATE TABLE departments(
	department_id INTEGER AUTO_INCREMENT,
    department_name VARCHAR(100),
    over_head_costs DECIMAL(10,2),
    PRIMARY KEY(department_id)
);

INSERT INTO
departments(department_name, over_head_costs)
VALUES
("Books", 10000),
("Video Games", 95000),
("Video Game Consoles", 60000);





