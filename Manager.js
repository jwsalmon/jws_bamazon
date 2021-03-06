
var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'Bamazon_db'
});

//Establish Connection - Call the Manager Input function
connection.connect(function (err) {
	if (err) throw err;
	console.log('connected as id: ' + connection.threadId)
	managerInput();
});


//FUNCTIONS
//=============================================================

//Prompt the user for the action they would like to perform and then call the new transaction function
function managerInput() {
	inquirer.prompt([{
		type: 'list',
		name: 'input',
		message: 'What would you like to do today?',
		choices: ['1) View Products for sale', '2) View low inventory', '3) Add to inventory', '4) Add new product']
	}]).then(function (answer) {
		switch (answer.input) {
			case '1) View Products for sale':
				connection.query('SELECT * FROM products', function (err, res) {
					if (err) throw err;
					console.log('');
					console.log('========================ITEMS IN STORE=======================');
					for (i = 0; i < res.length; i++) {
						console.log('Item ID:' + res[i].id);
						console.log('Product Name: ' + res[i].ProductName);
						console.log('Price: ' + '$' + res[i].Price);
						console.log('Quantity in Stock: ' + res[i].StockQuantity);
						console.log('---------------------');
					}
					console.log('')
					newTransaction();
				});
				break;
			case '2) View low inventory':
				connection.query('SELECT * FROM products WHERE StockQuantity < 5', function (err, res) {
					if (err) throw err;
					console.log('')
					console.log('========================LOW INVENTORY=======================');
					for (i = 0; i < res.length; i++) {
						console.log('Name: ' + res[i].ProductName);
						console.log('Product ID: ' + res[i].id);
						console.log('Quantity in Stock: ' + res[i].StockQuantity);
						console.log('---------------------');
					}
					newTransaction();
				});
				break;
			case '3) Add to inventory':
				inquirer.prompt([{
					name: 'item',
					message: 'Enter the ID of the item you wish to update:',
					validate: function (value) {
						var valid = value.match(/^[0-9]+$/)
						if (valid) {
							return true
						}
						return 'Please enter a numerical value'
					}
				}, {
					name: 'number',
					message: 'How many items would you like to add to the current supply?',
					validate: function (value) {
						var valid = value.match(/^[0-9]+$/)
						if (valid) {
							return true
						}
						return 'Please enter a numerical value'
					}
				}]).then(function (answer) {
					connection.query('SELECT * FROM products WHERE id = ?', [answer.item], function (err, res) {
						connection.query('UPDATE products SET ? Where ?', [{
							StockQuantity: res[0].StockQuantity + parseInt(answer.number)
						}, {
							id: answer.item
						}], function (err, res) { });
					})
					console.log('Inventory updated');
					newTransaction();
				});
				break;
			case '4) Add new product':
				inquirer.prompt([{
					name: 'product',
					message: 'Enter name of product:'
				}, {
					name: 'department',
					message: 'Enter a department for this product'
				}, {
					name: 'price',
					message: 'Enter a price for this product',
					validate: function (value) {
						var valid = value.match(/^[0-9]+$/)
						if (valid) {
							return true
						}
						return 'Please enter a numerical value'
					}
				}, {
					name: 'stock',
					message: 'Please enter a stock quantity for this product',
					validate: function (value) {
						var valid = value.match(/^[0-9]+$/)
						if (valid) {
							return true
						}
						return 'Please enter a numerical value'
					}
				}]).then(function (answer) {
					connection.query('INSERT into products SET ?', {
						ProductName: answer.product,
						DepartmentName: answer.department,
						Price: answer.price,
						StockQuantity: answer.stock
					}, function (err, res) { });
					console.log('Product Added');
					newTransaction();
				});
				break;
		}
	});
};

//Prompt the user to see if they would like to perform another transaction or end the connection
function newTransaction() {
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Would you like to perform another transaction?'
	}]).then(function (answer) {
		if (answer.choice) {
			managerInput();
		}
		else {
			console.log('Have a good day');
			connection.end();
		}
	})
}