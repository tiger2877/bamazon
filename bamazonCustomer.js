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

  // Function to start the app
  runApp();
});

// function which lists all the products and prompts for a purchase
function runApp() {
  connection.query(
    "SELECT * FROM products", function(err, res) {
    console.log("Welcome to Bamazon" + "\n" + "====================================================");
    for ( var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " || " + "Product: " + res[i].product_name + " || " + "Price: $" + res[i].price);
    }
    console.log("---------------------------------------------------");

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
    ]).then(function(answer) {
      var custProduct = (answer.id) - 1;
      var orderQuantity = parseInt(answer.qty);
      var total = parseFloat(((res[custProduct].price) * orderQuantity).toFixed(2));
      
      // Check if quantity is sufficient
      if(res[custProduct].stock_quantity >= orderQuantity) {
      
      // After purchase, update the quantity in products
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
          stock_quantity: (res[custProduct].stock_quantity - orderQuantity)
        },{
          item_id: answer.id
        }], 
        function(err, res){
          if(err) throw err;
          console.log("Your total is $" + total + ". Thanks for your order!");
          reRun();
        });
      } else {
        console.log("Insufficient quantity!");
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
      runApp();
    } else {
      console.log("Thanks for shopping Bamazon!");
      connection.end();
    }
  });
}