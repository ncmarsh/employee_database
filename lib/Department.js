const inquirer = require("inquirer");

class Department {
    constructor(id, dept_name) {
        this.id = id;
        this.dept_name = dept_name;
    }
}

module.exports = Department;