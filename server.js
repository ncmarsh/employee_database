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
            "View All Employees by Department",
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
                case "View All Employees by Department":
                    allEmployeesByDept();
                break;
                // case "View All Employees by Manager":
                //     allEmployeesByMgr()
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
    let query = "SELECT employee.id AS Id, employee.first_name AS `First Name`, employee.last_name AS `Last Name`, role.title AS Title, department.dept_name AS Department, role.salary AS Salary, CONCAT(m.first_name,' ',m.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.dept_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id";

    connection.query(query, function(err, results) {
        if (err) throw err;

        console.table(results);

        startApp();
    })
}

// View All Employees by Dept 
function allEmployeesByDept() {
    let query = "SELECT DISTINCT dept_name FROM department ORDER BY dept_name ASC";

    connection.query(query, function(err, results) {
        if (err) throw err;

        let allDepts = [];

        for (let i = 0; i < results.length; i++) {
            let eachDept = results[i].dept_name;
            allDepts.push(eachDept);
        }
        
        inquirer
        .prompt([
            {
                type: "list",
                message: "Which department's employees would you like to view?",
                name: "deptChoice",
                choices: [...allDepts]
            }
        ]).then(function(response) {
            let query = "SELECT employee.id AS Id, employee.first_name AS `First Name`, employee.last_name AS `Last Name`, role.title AS Title, role.salary AS Salary, CONCAT(m.first_name,' ',m.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.dept_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id WHERE ?";

            connection.query(query, {dept_name: response.deptChoice}, function(err, results) {
                if (err) throw err;
 
                console.table(results);

                startApp();
            })
        })
    })
}

// View All Employees by Manager
// function allEmployeesByMgr() {
//     let query = "SELECT * FROM employee ORDER BY last_name ASC";
    
//     connection.query(query, function(err, results) {
//         if (err) throw err;

//         let allEmployees = [];

//         for (let i = 0; i < results.length; i++) {
//             let eachEmployee = results[i].first_name + " " + results[i].last_name;
//             allEmployees.push(eachEmployee);
//         }
        
//         inquirer
//         .prompt([
//             {
//                 type: "list",
//                 message: "Which manager's employees would you like to view?",
//                 name: "mgrChoice",
//                 choices: [...allEmployees]
//             }
//         ]).then(function(response) {
//             console.log(response.mgrChoice);

//             let query = "SELECT employee.id AS Id, employee.first_name AS `First Name`, employee.last_name AS `Last Name`, role.title `Title`, department.dept_name AS `Department`, role.salary AS `Salary` FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.dept_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id WHERE ?";

//             connection.query(query, [response.mgrChoice], function(err, results) {
//                 if (err) throw err;
 
//                 console.table(results);

//                 startApp();
//             })
//         })
//     })
// }

// Add Employee - asks first name, asks last name, list of titles, asks manager using a list including a none option
function addEmployee() {
    // let query = "SELECT * FROM role";
    let query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id";

    connection.query(query, function(err, results) {
        if (err) throw err;

        let employeeNames = ["None"];
        let allRoles = [];

        for (let i = 0; i < results.length; i++) {
            let eachName = results[i].first_name + " " + results[i].last_name;
            employeeNames.push(eachName);

            let eachRole = results[i].title;
            allRoles.push(eachRole); 
        }

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
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "empManager",
                choices: [...employeeNames]
            }
        ]).then(function(response) {
            let chosenRoleId = "";
            
            for (let i = 0; i < results.length; i++) {
                if (response.title === results[i].title) {
                    chosenRoleId = results[i].role_id;
                }
            }

            let chosenMgrId = "";

            for (let i = 0; i < results.length; i++) {
                if (response.empManager === (results[i].first_name + " " + results[i].last_name)) {
                    chosenMgrId = results[i].id;
                }
                else if (response.empManager === "None") {
                    chosenMgrId = null;
                }
            }

            connection.query("INSERT INTO employee SET ?",   
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: chosenRoleId,
                    manager_id: chosenMgrId
                },
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
    // let query = "SELECT *, role.title AS Title from employee LEFT JOIN role ON employee.role_id = role.id";
    // let query = "SELECT * FROM employee ORDER BY last_name ASC";
    let query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id";

    connection.query(query, function(err, results) {
        if (err) throw err;
        console.table(results);

        let employeeNames = [];
        let allRoles = [];

        for (let i = 0; i < results.length; i++) {
            let eachName = results[i].first_name + " " + results[i].last_name;
            employeeNames.push(eachName);

            let eachRole = results[i].title;
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
            let chosenEmployeeId;
            let chosenRoleId;

            for (let i = 0; i < results.length; i++) {
                if ((results[i].first_name + " " + results[i].last_name) === response.name) {
                    chosenEmployeeId = results[i].id;
                }
            }
            console.log(chosenEmployeeId);
            for (let i = 0; i < results.length; i++) {
                if (results[i].title === response.role) {
                    chosenRoleId = results[i].role_id;
                }
            }
 
            console.log(chosenRoleId);
            connection.query("UPDATE employee SET ? WHERE ?", 
            [
                {
                    role_id: chosenRoleId
                },
                {
                    id: chosenEmployeeId
                }
            ], function(err) {
                if (err) throw err;

                console.log("Employee role updated.");

                startApp();
            })
        })
    })
}

// Update Employee Manager - list to choose employee to update, list to choose manager
// function updateEmployeeMgr() {

// }

// View All Roles - will display an alphabetical table of all the roles in the database
function allRoles() {
    let query = "SELECT DISTINCT title AS Title FROM role ORDER BY title ASC";

    connection.query(query, function(err, results) {
        if (err) throw err;

        console.table(results);

        startApp();
    })   
}

// Add Role - adds a new role with salary and the department id to the database
function addRole() {
    let query = "SELECT * FROM department ORDER BY dept_name ASC";

    connection.query(query, function(err, results) {
        if (err) throw err;

        let allDepts = [];

        for (let i = 0; i < results.length; i++) {
            let eachDept = results[i].dept_name;
            allDepts.push(eachDept);
        }

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
                choices: [...allDepts]
            }
        ]).then(function(response) {
            let chosenDeptId;

            for (let i = 0; i < results.length; i++) {
                if (results[i].dept_name === response.dept) {
                    chosenDeptId = results[i].id;
                }
            }

            connection.query("INSERT INTO role SET ?", 
                {
                    title: response.newRole,
                    salary: response.salary,
                    dept_id: chosenDeptId
                },
                function(err) {
                    if (err) throw err;
                    console.log("New role has been added");
    
                    startApp();
                })   
        })
    })
}

// Remove Role
// function removeRole() {

// }

// View All Departments - will display an alphabetical table of all departments in the database
function allDepts() {
    let query = "SELECT DISTINCT dept_name AS Department FROM department ORDER BY dept_name ASC";

    connection.query(query, function(err, results) {
        if (err) throw err;

        console.table(results);

        startApp();
    })
}

// Add Department - adds a new department to the database
function addDept() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What department would you like to add?",
            name: "newDept"
        }
    ]).then(function(response) {
        connection.query("INSERT INTO department SET ?", 
            {
                dept_name: response.newDept
            },
            function(err) {
                if (err) throw err;
                console.log("New department has been added");

                startApp();
            })            
        })
}

// Remove Department
// function removeDept() {

// }