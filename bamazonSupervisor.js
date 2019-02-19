  /*-- bamazon Supervisor -->
  <!-- =================================================================================== -->
  <!-- List a set of menu options:                                                         -->
  <!-- 1. View Product Sales by Department:                                                -->
  <!--    * Display product sales which is updated whenever a customer buys a product      -->
  <!--    * Display total profit using ALIAS                                               -->
  <!--    * Insert dummy numbers for overhead costs for each dept                          -->
  <!-- 2. Create New Department                                                            -->
  <!-- =================================================================================== -->*/

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
      console.log("Selecting all departments...\n");

      var query = "SELECT *, product_sales - over_head_costs AS total_profit FROM departments"

      connection.query(query, function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("TOTAL SALES BY DEPARMENT" + "\n" + "====================================================");
        for (var i = 0; i < res.length; i++) {
          console.log("Department ID: " + res[i].dept_id + " || " + "Department Name: " + res[i].dept_name + " || " + "Overhead Cost: $" + res[i].over_head_costs + " || " + "Product Sales: $" + res[i].product_sales+ " || " + "Total Profit: $" + res[i].total_profit);
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
              name: "department",
              type: "input",
              message: "What department would you like to add?"    
            }
          ])  
          .then(function(answer) {
              // when finished prompting, insert a new item into the db with that info
              connection.query(
                "INSERT INTO departments SET ?",
                {
                    dept_name: answer.department,
                },
                function(err) {
                  if (err) throw err;
                  console.log("---------------------------------------------------");
                  console.log("Your new department was added successfully!");
                  console.log("---------------------------------------------------");
                  runSearch();
                }
              );
            });
        }
        
    