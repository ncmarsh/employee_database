# Employee Database

![GitHub top language](https://img.shields.io/github/languages/top/ncmarsh/employee_database)
![GitHub language count](https://img.shields.io/github/languages/count/ncmarsh/employee_database)
![GitHub package.json version](https://img.shields.io/github/package-json/v/ncmarsh/employee_database)

Keep track of your business using this Employee Database command line application.

## Table of Contents

1. [Usage](#Usage)
1. [Languages and Concepts](#Languages-and-Concepts)
1. [Installation](#Installation)
1. [Demo](#Demo)
1. [Roadmap](#Roadmap)
1. [Links](#Links)
1. [Contact](#Contact)
1. [Contributing](#Contributing)
1. [License](#License)

## Usage

Using this Content Management System, you can keep track of your employees, their roles, salaries and managers and also maintain which roles and departments you have in your business.

## Languages and Concepts

- JavaScript
- [Node.js](https://nodejs.org/en/)
- [MySql](https://www.npmjs.com/package/mysql)
- [Inquirer.js](https://www.npmjs.com/package/inquirer)
- [console.table](https://www.npmjs.com/package/console.table)

## Installation

Follow these steps to get started:

After cloning the repository to your local computer, you'll want to add a new file entitled

        .env

Inside this file, you'll want to add the following lines:

        DB_PORT=3306
        DB_USER=root or YOUR USERNAME HERE
        DB_PASSWORD=`YOUR MYSQL PASSWORD HERE`
        DB_DB=employee_db

Next, you'll want to initialize Node.js and install the dependencies for the program. You can do this by running:

        $ npm init
        $ npm install

Next, you'll want to run the schema.sql file in your MySql Workbench to set up the database schema. 

Note: The schema.sql includes initial dummy data.

Finally to begin the program, you'll enter:

        $ node server.js

## Demo

![Demo](./assets/demo.gif)

[View Full Demo](https://youtu.be/i2hdFaexJS4)

## Roadmap

To continue with this project, there are several features/functions I would like to add. First I would like to adjust the array that is created to show all the roles so that it doesn't show duplicates and so that it will show all roles, rather than just the roles that are already assigned to an employee. I would like to add the options to View All Employees by Manager, Update Employee Manager, Remove Roles, Remove Departments, and View Total Utilized Budget of a Department. I would like the Remove Employees to include if the employee has more than one first name or more than one last name. I would like to add validation for empty inputs and validation for confirmation prior to completing the requested task. I would like to add a new column to specify how many positions of a certain role there are and to then show if there are any vacant positions. I would like to add a Manager column so that in the list of Manager options it will only show the employees designated as Managers.

## Links

- [Project Repository](https://github.com/ncmarsh/employee_database)
- [View Full Demo](https://youtu.be/i2hdFaexJS4)

## Contact

- Nicole Marshall - [@ncmarsh](https://github.com/ncmarsh)

## Contributing

This is a personal project; no contributions are required at this time.

## License

No license granted.

##### [Return to Top of Page](#Employee-Database)