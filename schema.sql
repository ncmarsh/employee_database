CREATE database employee_db;

USE employee_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  salary INT NOT NULL,
  dept_id INT,
  CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NULL,
  last_name VARCHAR(50) NULL,
  role_id INT,
  manager_id INT NULL,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id),
  CONSTRAINT fk_mgr FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

INSERT INTO department (dept_name) VALUES ("Science"),("Engineering"),("Sales"),("Finance");
INSERT INTO role (title, salary,dept_id) VALUES ("Scientist", 10, 1),("Engineer", 10, 2),("Salesperson", 5, 3),("Accountant", 5, 4);
INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ("Bill", "Nye", 1, null),("Betty", "White", 2, 1),("Elon", "Tusk", 2, 1),("Bill", "Bo", 3, 1),("Jiminy", "Cricket", 4, 1);
