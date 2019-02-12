  /*-- bamazon Manager -->
  <!-- =========================================================================== -->
  <!-- List a set of menu options:                                                 -->
  <!-- View Products for Sale: ist every available item:                           -->
  <!-- View Low Inventory: list all items with an inventory count lower than five  -->
  <!-- Add to Inventory: display a prompt that will let the manager "add more"     -->
  <!-- Add New Product:  add a completely new product to the store                 -->
  <!-- =========================================================================== -->*/

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        productSearch();
        break;

      case "View Low Inventory":
        lowInventorySearch();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        addNewProduct();
        break;
          
      case "exit":
        connection.end();
        break;
      }
    });
}

// show all products
function productSearch() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log("PRODUCTS FOR SALE" + "\n" + "====================================================");
      for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].item_id + " || " + "Product: " + res[i].product_name + " || " + "Price: $" + res[i].price + " || " + "Quantity: " + res[i].stock_quantity);
      }
      console.log("---------------------------------------------------");
      runSearch();
    });
  }
  
// show low inventory products
function lowInventorySearch() {
  var query = "SELECT product_name FROM products WHERE stock_quantity < 5";
  connection.query(query, function(err, res) {
    console.log("LOW INVENTORY" + "\n" + "====================================================");
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name + " || " + "Quantity: " + res[i].stock_quantity);
    }
    console.log("---------------------------------------------------");
    runSearch();
  });
}

// add inventory to the store
function addInventory() {
    // query the database for all products
    connection.query("SELECT * FROM products", function(error, results) {
      if (error) throw error;
      // once you have the product, prompt the manager for which they'd like to add inventory to
      inquirer
        .prompt([
          {
            name: "choice",
            type: "list",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name);
              }
              return choiceArray;
            },
            message: "What product would you like to add inventory to?"
          },
          {
            name: "quantity",
            type: "input",
            message: "How much would you like to add?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.choice) {
              chosenItem = results[i].stock_quantity;
            }
          }
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenItem + parseInt(answer.quantity)
              },
              {
                product_name: answer.choice
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("---------------------------------------------------");
              console.log("Inventory updated successfully!");
              console.log("---------------------------------------------------");
              runSearch();
            }
          );
        });
    });
  }
  
//add new product to the store
function addNewProduct() {
    // prompt for info about the item to be added to the store
    inquirer
      .prompt([
        {
            name: "item",
            type: "input",
            message: "What is the item you would like to add to the store?"    
          },
          {
            name: "department",
            type: "input",
            message: "What department would you like to place your new item in?"    
          },
          {
            name: "price",
            type: "input",
            message: "How much would you like to sell this item for?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
          },
          {
            name: "quantity",
            type: "input",
            message: "How many would you like to store?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
          }
        ])  
        .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "INSERT INTO products SET ?",
              {
                product_name: answer.item,
                dept_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity
              },
              function(err) {
                if (err) throw err;
                console.log("---------------------------------------------------");
                console.log("Your new item was added successfully!");
                console.log("---------------------------------------------------");
                runSearch();
              }
            );
          });
      }
      
  