DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL,
    stock_quantity INTEGER,
    PRIMARY KEY(item_id)
);

INSERT INTO 
products(product_name, department_name, price, stock_quantity) 
VALUES
("Deep Learning: A Practitioner's Approach", "Books", 12.15, 36),
("Marvel's Spider-Man", "Video Games", 39.99, 98),
("The Adventure Zone: Murder on the Rockport Limited!", "Books", 17.99, 100),
("Red Dead Redemption 2", "Video Games", 59.88, 33),
("PHP & MySQL: Server-side Web Development", "Books", 38.25, 1),
("God of War", "Video Games", 39.96, 145),
("Shadow of the Colossus", "Video Games", 19.93, 5),
("Nintendo Switch", "Video Game Consoles", 299.00, 164),
("Nintendo Selects: The Legend of Zelda Ocarina of Time 3D", "Video Games", 18.50, 2),
("Assassin's Creed Odyssey", "Video Games", 29.99, 131);
