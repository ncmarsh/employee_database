// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

// Establish connection to MySQL server
const connection = mysql.createConnection({
    host: "localhost",
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
});

// Start connection to MySQL
connection.connect(function(err) {
    if (err) throw err;
    startApp();;
});
  
const userQuestion = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "userChoice",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "Exit"
        ]
    }
]

function startApp() {
    console.log(" ______   ___ __ __   ______   __       ______   __  __   ______   ______       ______   ________   _________  ________    _______   ________   ______   ______      ");
    console.log("/_____/\ /__//_//_/\ /_____/\ /_/\     /_____/\ /_/\/_/\ /_____/\ /_____/\     /_____/\ /_______/\ /________/\/_______/\ /_______/\ /_______/\ /_____/\ /_____/\     ");
    console.log("\::::_\/_\::\| \| \ \\:::_ \ \\:\ \    \:::_ \ \\ \ \ \ \\::::_\/_\::::_\/_    \:::_ \ \\::: _  \ \\__.::.__\/\::: _  \ \\::: _  \ \\::: _  \ \\::::_\/_\::::_\/_    ");
    console.log(" \:\/___/\\:.      \ \\:(_) \ \\:\ \    \:\ \ \ \\:\_\ \ \\:\/___/\\:\/___/\    \:\ \ \ \\::(_)  \ \  \::\ \   \::(_)  \ \\::(_)  \/_\::(_)  \ \\:\/___/\\:\/___/\   ");
    console.log("  \::___\/_\:.\-/\  \ \\: ___\/ \:\ \____\:\ \ \ \\::::_\/ \::___\/_\::___\/_    \:\ \ \ \\:: __  \ \  \::\ \   \:: __  \ \\::  _  \ \\:: __  \ \\_::._\:\\::___\/_  ");
    console.log("   \:\____/\\. \  \  \ \\ \ \    \:\/___/\\:\_\ \ \ \::\ \  \:\____/\\:\____/\    \:\/.:| |\:.\ \  \ \  \::\ \   \:.\ \  \ \\::(_)  \ \\:.\ \  \ \ /____\:\\:\____/\ ");
    console.log("    \_____\/ \__\/ \__\/ \_\/     \_____\/ \_____\/  \__\/   \_____\/ \_____\/     \____/_/ \__\/\__\/   \__\/    \__\/\__\/ \_______\/ \__\/\__\/ \_____\/ \_____\/ ");
    
    inquirer
        .prompt([
            {

            }
        ])
}

// View All Employees will show a table of all employees - employee table with id, firstname, lastname, title, dept name, salary, and manager name
// View All Employees by Dept 
// View All Employees by Manager
// Add Employee - asks first name, asks last name, list of titles, asks salary, asks manager using a list including a none option
// Remove Employee - shows list of employees
// Update Employee Role
// Update Employee Manager - list to choose employee to update, list to choose manager
// View All Roles
// Add Role
// Remove Role