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
        message: "What is the ID of the product you would like to purchase?"
      },
      {
        type: "input",
        name: "qty",
        message: "How many would you like to purchase?"
      }
    ]).then(function(answer) {
      var custProduct = (answer.id) - 1;
      var prodQuantity = parseInt(answer.qty);
      var total = parseFloat(((res[custProduct].price) * prodQuantity).toFixed(2));
      
      // Check if quantity is sufficient
      if(res[custProduct].stock_quantity >= prodQuantity) {
      
      // After purchase, update the quantity in products
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
          stock_quantity: (res[custProduct].stock_quantity - prodQuantity)
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
    }
  });
}