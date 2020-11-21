DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL,
  dept_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(50) NOT NULL,
  salary DEC(10,2) NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id) INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(50) NULL,
  last_name VARCHAR(50) NULL,
  FOREIGN KEY (role_id) REFERENCES role(id) INT NOT NULL,
--   FOREIGN KEY (manager_id) REFERENCES  INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
