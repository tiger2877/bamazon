-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_DB;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_DB;
-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_DB;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  dept_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);