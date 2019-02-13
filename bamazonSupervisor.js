  /*-- bamazon Supervisor -->
  <!-- =================================================== -->
  <!-- List a set of menu options:                         -->
  <!-- 1. View Product Sales by Department:                -->
  <!--    * Display a summarized table                     -->
  <!--    * Total_profit should be calculated on the fly:  -->
  <!--      product_sales minus over_head_costs            -->
  <!-- 2. Create New Department                            -->
  <!-- =================================================== -->*/

  var mysql = require("mysql");
  var inquirer = require("inquirer");
  var Table = require('cli-table');
  
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
          "View Product Sales by Department",
          "Create New Department",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Product Sales by Department":
          productSearch();
          break;
  
        case "Create New Department":
          addNewDepartment();
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
    
  //add new department
  function addNewDepartment() {
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
        
    