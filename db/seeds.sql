USE employees_db;

INSERT INTO department (dept_name)
VALUES ('Finance'),
       ('Legal'),
       ('Marketing'),
       ('Sales'),
       ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 60000, 1),
       ('Lawyer', 90000, 2),
       ('Advertiser', 45000, 3),
       ('Salesperson', 50000, 4),
       ('Personal Relations', 55000, 5),
       ('Publicist', 40000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Bill', 'Obrien', 1),
       ('Jim', 'Benson', 3),
       ('Frank', 'Heinz', 6),
       ('Kathy', 'Mcbeth', 4),
       ('Greg', 'Clotz', 2),
       ('Arthur', 'Cromwell', 5),
       ('Betty', 'Spaghetti', 3),
       ('Devin', 'Mcknight', 4),
       ('Heath', 'Cliff', 5),
       ('James', 'Bond', 2);

UPDATE employee SET manager_id = 2 
WHERE id IN (1, 3, 4, 6);