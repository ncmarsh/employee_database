const inquirer = require("inquirer");

class Role {
    constructor(id, title, salary, dept_id) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.dept_id = dept_id;
    }
}

module.exports = Role;