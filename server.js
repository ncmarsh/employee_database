// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const Department = require("./lib/Department");
const Employee = require("./lib/Employee");
const Role = require("./lib/Role");
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

    // console.log("  ______   ___ __ __   ______   __       ______   __  __   ______   ______      ");
    // console.log(" /_____/\ /__//_//_/\ /_____/\ /_/\     /_____/\ /_/\/_/\ /_____/\ /_____/\     ");
    // console.log(" \::::_\/_\::\| \| \ \\:::_ \ \\:\ \    \:::_ \ \\ \ \ \ \\::::_\/_\::::_\/_    ");
    // console.log("  \:\/___/\\:.      \ \\:(_) \ \\:\ \    \:\ \ \ \\:\_\ \ \\:\/___/\\:\/___/\   ");
    // console.log("   \::___\/_\:.\-/\  \ \\: ___\/ \:\ \____\:\ \ \ \\::::_\/ \::___\/_\::___\/_  ");
    // console.log("    \:\____/\\. \  \  \ \\ \ \    \:\/___/\\:\_\ \ \ \::\ \  \:\____/\\:\____/\ ");
    // console.log("     \_____\/ \__\/ \__\/ \_\/     \_____\/ \_____\/  \__\/   \_____\/ \_____\/ ");
    // console.log("                                                                                ");
    // console.log("   ______   ________   _________  ________    _______   ________   ______   ______      ");
    // console.log("  /_____/\ /_______/\ /________/\/_______/\ /_______/\ /_______/\ /_____/\ /_____/\     ");
    // console.log("  \:::_ \ \\::: _  \ \\__.::.__\/\::: _  \ \\::: _  \ \\::: _  \ \\::::_\/_\::::_\/_    ");
    // console.log("   \:\ \ \ \\::(_)  \ \  \::\ \   \::(_)  \ \\::(_)  \/_\::(_)  \ \\:\/___/\\:\/___/\   ");
    // console.log("    \:\ \ \ \\:: __  \ \  \::\ \   \:: __  \ \\::  _  \ \\:: __  \ \\_::._\:\\::___\/_  ");
    // console.log("     \:\/.:| |\:.\ \  \ \  \::\ \   \:.\ \  \ \\::(_)  \ \\:.\ \  \ \ /____\:\\:\____/\ ");
    // console.log("      \____/_/ \__\/\__\/   \__\/    \__\/\__\/ \_______\/ \__\/\__\/ \_____\/ \_____\/ ");
    // console.log("\n");

    startApp();
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
                // case "View All Employees by Department":
                    // allEmployeesByDept();
                // break;
                // case "View All Employees by Manager":
                    // allEmployeesByMgr()
                // break;
                case "Add Employee":
                    addEmployee();
                break;
                // case "Remove Employee":
                    // removeEmployee();
                // break;
                case "Update Employee Role":
                    updateRole();
                break;
                // case "Update Employee Manager":
                    // updateEmployeeMgr();
                // break;
                case "View All Roles":
                    allRoles();
                break;
                case "Add Role":
                    addRole();
                break;
                // case "Remove Role":
                    // removeRole();
                // break;
                case "View All Departments":
                    allDepts();
                break;
                case "Add Department":
                    addDept();
                break;
                // case "Remove Department":
                    // removeDept();
                // break;
                case "Exit":
                    connection.end();
            }
        })
}


// View All Employees will show a table of all employees information
function allEmployees() {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, department.dept_name, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.dept_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id";

    connection.query(query, function(err, result) {
        if (err) throw err;

        console.table(result);

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
    let query = "SELECT * FROM role";

    connection.query(query, function(err, result) {
        if (err) throw err;
        console.table(result);
        let allRoles = [];

        for (let i = 0; i < result.length; i++) {
            let eachRole = result[i].title;
            allRoles.push(eachRole);
        }

        console.log(allRoles);

        inquirer
        .prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "lastName"
            },
            {
                type: "list",
                message: "Select the employee's title.",
                name: "title",
                choices: [...allRoles]
            }
            // {
            //     type: "list",
            //     message: "Who is the employee's manager?",
            //     name: "empManager",
            //     choices: [result.manager_id]
            // }
        ]).then(function(response) {
            console.log(response);

            let chosenRoleId = "";
            
            for (let i = 0; i < result.length; i++) {
                if (response.title === result[i].title) {
                    chosenRoleId = result[i].id;
                }
            }

            connection.query("INSERT INTO employee SET ?", [     
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: chosenRoleId
                }
            ],
            function(err) {
                if (err) throw err;
                console.log("Employee database updated!");

                startApp();
            });
        })
    })
}

// Remove Employee - shows list of employees
// function removeEmployee() {

// }

// Update Employee Role
function updateRole() {
    let query = "SELECT * from employee LEFT JOIN role ON employee.role_id = role.id";

    connection.query(query, function(err, result) {
        if (err) throw err;
        console.table(result);

        let employeeNames = [];
        let allRoles = [];

        for (let i = 0; i < result.length; i++) {
            let eachName = result[i].first_name + " " + result[i].last_name;
            employeeNames.push(eachName);

            let eachRole = result[i].title;
            allRoles.push(eachRole);
        }

        console.log(employeeNames);
        console.log(allRoles);

        inquirer
        .prompt([
            {
                type: "list",
                message: "Whose role would you like to update?",
                name: "name",
                choices: [...employeeNames]
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "role",
                choices: [...allRoles]
            }
        ]).then(function(response) {
            console.log("working");

            startApp();
        })
    })
}

// Update Employee Manager - list to choose employee to update, list to choose manager
// function updateEmployeeMgr() {

// }

// View All Roles
function allRoles() {
    let query = "SELECT DISTINCT title FROM role";

    connection.query(query, function(err, result) {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            console.table([
                {title: result[i].title}
            ]);
        };

        startApp();
    })   
}

// Add Role
function addRole() {
    let query = "SELECT * FROM role";

    connection.query(query, function(err, result) {
        if (err) throw err;

        inquirer
        .prompt([
            {
                type: "input",
                message: "What role would you like to add?",
                name: "newRole"
            },
            {
                type: "input",
                message: "What is the salary for this new role?",
                name: "salary"
            },
            {
                type: "list",
                message: "In which department is this new role?",
                name: "dept",
                choices: [

                ]
            }
        ]).then(function(response) {
            console.log(response.newRole);
            "INSERT INTO role SET ?",
            {
                title: response.newRole,
                salary: response.salary
            }

            startApp();
        })
    })
}

// Remove Role
// function removeRole() {

// }

// View All Departments
function allDepts() {
    let query = "SELECT DISTINCT dept_name FROM department";

    connection.query(query, function(err, result) {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {
            console.table([
                {dept_name: result[i].dept_name}
            ]);
        };

        startApp();
    })
}

// Add Department
function addDept() {
    connection.query(query, function(err, result) {
        if (err) throw err;

        inquirer
        .prompt([
            {
                type: "input",
                message: "What department would you like to add?",
                name: "newDept"
            }
        ]).then(function(response) {
            console.log("working");
            "INSERT INTO department SET ?",
            {
                dept_name: response.newDept
            },
            startApp();
        })
    })
}

// Remove Department
// function removeDept() {

// }