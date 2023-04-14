DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id)
);
