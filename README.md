# Node.js & MySQL

## Overview

An Amazon-like storefront using Node.js and MySQL. The app will take in orders from customers and deplete stock from the store’s inventory.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

NPM packages used for this project:

| Node APM | Description |
| --- | --- |
| MySQL | https://www.npmjs.com/package/mysql|
| Inquirer | https://www.npmjs.com/package/inquirer|

- - -

### Screenshots

* `Customer View`
![customerview](https://github.com/tiger2877/bamazon/blob/master/bamazoncustomer1.jpg)
* `Manager View 1`
![managerview1](https://github.com/tiger2877/bamazon/blob/master/bamazonmanager1.jpg)
* `Manager View 2`
![managerview2](https://github.com/tiger2877/bamazon/blob/master/bamazonmanager2.jpg)
* `Supervisor View 1`
![supervisorview1](https://github.com/tiger2877/bamazon/blob/master/bamazonsupervisor1.jpg)
* `Supervisor View 2` 
![supervisorview2](https://github.com/tiger2877/bamazon/blob/master/bamazonsupervisor2.jpg)

- - -

### Customer View

   * Prints the products in the store.

   * Prompts customer which product they would like to purchase by ID number.

   * Asks customer how many they would like to purchase. If there is a sufficient amount in stock, it will return the total for that purchase. If there is not enough of the product in stock, it will tell the user that there isn’t enough of the productis insufficient inventory.

   * If the purchase is successful, the quantity will be reflected in the database.

- - -

### Manager View

* Create a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.


- - -

### Supervisor View

This app will start with a menu asking the manager to: view products for sale, view all low inventory, add to inventory or add a new product to the database

   * view products for sale
   
   * view all low inventory
   
   * add to inventory or add a new product to the database

- - -
