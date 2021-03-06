/* Seeds for SQL table. */
USE bamazon_db;

/* Insert 3 Rows into your new table */
-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Hasbro Connect 4 Game","Toys & Games",12.99,350),
    ("Nintendo Switch Console - Neon Edition","Video Games",379.99,100),
    ("Nest Learning Thermostat","Smart Home",280,100),
    ("Sony XBR55X900F/A 55 inches LED Television","Television & Home Theatre",1199.99,50),
    ("Napoleon P500RSIBNSS-1 Prestige Natural Gas Grill in Stainless Steel","BBQs & Grilling",1322.77,30),
    ("Nespresso Vertuo Coffee and Espresso Machine","Kitchen",269,100),
    ("Dare to Lead: Brave Work. Tough Conversations. Whole Hearts.","Books",22.20,200),
    ("All Purpose High Density Non-Slip Exercise Yoga Mat with Carrying Strap","Exercise & Fitness",14.15,500),
    ("Fire TV Stick 4K with All-New Alexa Voice Remote","Electronics",54.99,300),
    ("Hilroy 9.5 Inch Thermal Laminator","Office Electronics & Supplies",16.28,250);


USE bamazon_db;
-- Creates new rows containing data in all named columns --
INSERT INTO departments (dept_name, over_head_costs, product_sales)
VALUES ("Toys & Games",500, 1000),
    ("Video Games",700, 1000),
    ("Smart Home",1000, 5500),
    ("Television & Home Theatre",2000, 7000),
    ("BBQs & Grilling",1500, 4000),
    ("Kitchen",1500, 5000),
    ("Books",1000, 3500),
    ("Exercise & Fitness",1100, 10000),
    ("Electronics",900, 4500),
    ("Office Electronics & Supplies",300, 2500);

USE bamazon_db;
DELETE FROM departments;
  