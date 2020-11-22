// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
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
    // console.log(" ______   ___ __ __   ______   __       ______   __  __   ______   ______       ______   ________   _________  ________    _______   ________   ______   ______      ");
    // console.log("/_____/\ /__//_//_/\ /_____/\ /_/\     /_____/\ /_/\/_/\ /_____/\ /_____/\     /_____/\ /_______/\ /________/\/_______/\ /_______/\ /_______/\ /_____/\ /_____/\     ");
    // console.log("\::::_\/_\::\| \| \ \\:::_ \ \\:\ \    \:::_ \ \\ \ \ \ \\::::_\/_\::::_\/_    \:::_ \ \\::: _  \ \\__.::.__\/\::: _  \ \\::: _  \ \\::: _  \ \\::::_\/_\::::_\/_    ");
    // console.log(" \:\/___/\\:.      \ \\:(_) \ \\:\ \    \:\ \ \ \\:\_\ \ \\:\/___/\\:\/___/\    \:\ \ \ \\::(_)  \ \  \::\ \   \::(_)  \ \\::(_)  \/_\::(_)  \ \\:\/___/\\:\/___/\   ");
    // console.log("  \::___\/_\:.\-/\  \ \\: ___\/ \:\ \____\:\ \ \ \\::::_\/ \::___\/_\::___\/_    \:\ \ \ \\:: __  \ \  \::\ \   \:: __  \ \\::  _  \ \\:: __  \ \\_::._\:\\::___\/_  ");
    // console.log("   \:\____/\\. \  \  \ \\ \ \    \:\/___/\\:\_\ \ \ \::\ \  \:\____/\\:\____/\    \:\/.:| |\:.\ \  \ \  \::\ \   \:.\ \  \ \\::(_)  \ \\:.\ \  \ \ /____\:\\:\____/\ ");
    // console.log("    \_____\/ \__\/ \__\/ \_\/     \_____\/ \_____\/  \__\/   \_____\/ \_____\/     \____/_/ \__\/\__\/   \__\/    \__\/\__\/ \_______\/ \__\/\__\/ \_____\/ \_____\/ ");
 
    startApp();;
});
  
const userQuestion = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "userChoice",
        choices: [
            "View All Employees",
            // "View All Employees by Department",
            // "View All Employees by Manager",
            "Add Employee",
            // "Remove Employee",
            "Update Employee Role",
            // "Update Employee Manager",
            "View All Roles",
            "Add Role",
            // "Remove Role",
            "View All Departments",
            "Add Department",
            // "Remove Department",
            "Exit"
        ]
    }
]

// Function to begin the application
function startApp() {   
    inquirer
        .prompt(
            userQuestion
        )
        .then(function(response) {
            switch(response.userChoice) {
                case "View All Employees":
                    allEmployees();
                break;
                // // case "View All Employees by Department":
                //     // allEmployeesByDept();
                // // break;
                // // case "View All Employees by Manager":
                //     // allEmployeesByMgr()
                // // break;
                // case "Add Employee":
                //     addEmployee();
                // break;
                // // case "Remove Employee":
                //     // removeEmployee();
                // // break;
                // case "Update Employee Role":
                //     updateRole();
                // break;
                // // case "Update Employee Manager":
                //     // updateEmployeeMgr();
                // // break;
                // case "View All Roles":
                //     allRoles();
                // break;
                // case "Add Role":
                //     addRole();
                // break;
                // // case "Remove Role":
                //     // removeRole();
                // // break;
                // case "View All Departments":
                //     allDepts();
                // break;
                // case "Add Department":
                //     addDept();
                // break;
                // // case "Remove Department":
                //     // removeDept();
                // // break;
                case "Exit":
                    connection.end();
            }
        })
}


// View All Employees will show a table of all employees information
function allEmployees() {
    let query = "SELECT * FROM employee ";
    // query += "LEFT JOIN role ON employee.role_id = role.title WHERE employee.role_id = employee.id";

    connection.query(query, function(err, result) {
        if (err) throw err;

        // console.log(result);
    
        for (let i = 0; i < result.length; i++) {
            console.table([
                {
                    id: result[i].id,
                    first_name: result[i].first_name, 
                    last_name: result[i].last_name, 
                    title: result[i].role_id, 
                    department: result[i].dept_id, 
                    salary: result[i].salary, 
                    manager: result[i].manager_id
                }
            ]);
        }

        startApp();
    })
}

// View All Employees by Dept 
// function allEmployeesByDept() {

// }

// View All Employees by Manager
// function allEmployeesByMgr() {

// }

// Add Employee - asks first name, asks last name, list of titles, asks salary, asks manager using a list including a none option
function addEmployee() {

}

// Remove Employee - shows list of employees
// function removeEmployee() {

// }

// Update Employee Role
function updateRole() {

}

// Update Employee Manager - list to choose employee to update, list to choose manager
// function updateEmployeeMgr() {

// }

// View All Roles
function allRoles() {
// SELECT DISTINCT to just get one..?
}

// Add Role
function addRole() {

}

// Remove Role
// function removeRole() {

// }

// View All Departments
function allDepts() {

}

// Add Department
function addDept() {

}

// Remove Department
// function removeDept() {

// }