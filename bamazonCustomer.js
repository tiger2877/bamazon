  /*-- bamazon customer -->
  <!-- =========================================================== -->
  <!-- display all of the items available for sale.                -->
  <!-- prompt users with two messages:                             -->
  <!-- 1. ask them the ID of the product they would like to buy    -->
  <!-- 2. ask how many units of the product they would like to buy -->
  <!-- check if your store has enough of the product:              --> 
  <!-- 1. if enough, fulfill the customer's order.                 --> 
  <!--    update product quantity basaed on the item id            --> 
  <!-- 2. if not enough, log a phrase like Insufficient quantity!  -->
  <!--    then prevent the order from going through                --> 
  <!-- =========================================================== -->*/

//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306, //8809

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
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
        "View All Products Available for Sale",
        "Buy an item",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Products Available for Sale":
        productSearch();
        break;

      case "Buy an item":
        buy();
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

  // function which lists all the products and prompts for a purchase
  function buy() {
 
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
  
    inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "What is product ID you want to buy?"
      },
      {
        type: "input",
        name: "qty",
        message: "How many units would you like to buy?"
      }
    ])
    .then(function(answer) {
      
      var custProduct = (answer.id) - 1;
      var orderQuantity = parseInt(answer.qty);
      var total = parseFloat(((res[custProduct].price) * orderQuantity).toFixed(2));

      // Check if quantity is sufficient
      if(res[custProduct].stock_quantity >= orderQuantity) {
      
      // After purchase, update the quantity in products & product sales in departments table
      var query = "UPDATE products INNER JOIN departments ON products.dept_name = departments.dept_name SET ? WHERE ?"
     
      connection.query(
        query,
        [{
          stock_quantity: (res[custProduct].stock_quantity - orderQuantity),
          product_sales: total
        },{
          item_id: answer.id
        }], 

        function(err, res){
          if (err) throw err;
          console.log("Your total is $" + total + ". Thanks for your order!");
          reRun();
        });

        } 
        else 
        {
        console.log("There isn't enough in stock!");
        reRun();
      }
    })
  })
}  

// Checks if customer would like to purchase another item
function reRun(){
  inquirer.prompt([
    {
      type: "confirm",
      name: "reply",
      message: "Would you like to purchase another item?"
    }
  ]).then(function(answer) {
    if(answer.reply) {
      buy();
    } 
    else 
    {
      console.log("Thanks for shopping Bamazon!");
      connection.end();
    }
  });
}