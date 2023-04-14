const mysql = require("mysql2")
const { printTable } = require("console-table-printer")
const inquirer = require("inquirer")

// Connect to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "default456",
  password: "password",
  database: "employees_db",
})

connection.connect((err) => {
  if (err) throw err
  console.log(`Connected to the personnel_db database.`)
  start()
})

function start() {
  inquirer.prompt([{
    type: "list",
    name: "home",
    message: "What would you like to do?",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
    ],
  }]
  )
    .then(({ home }) => {
      switch (home) {
        case "view all departments":
          viewDept()
          break

        case "view all roles":
          viewRole()
          break

        case "view all employees":
          viewEmp()
          break

        case "add a department":
          addDept()
          break

        case "add an employee":
          addEmp()
          break

        case "add a role":
          addRole()
          break

        case "update an employee role":
          updateRole()
          break
      }
    })
}

// View department table
function viewDept() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err
    printTable(res)
    start()
  })
}

// View role table
function viewRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err
    printTable(res)
    start()
  })
}

// View employee table
function viewEmp() {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err
    printTable(res)
    start()
  })
}

// Add a new employee to the table
function addEmp() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the first name of the employee: ",
      name: "first_name",
    },
    {
      type: "input",
      message: "Enter the last name of the employee: ",
      name: "last_name",
    },
    {
      type: "input",
      message: "Enter the role id of the employee: ",
      name: "role_id",
    },
    {
      type: "input",
      message: "Enter the manager id of the employee: ",
      name: "manager_id",
    },
  ])
    .then(({ first_name, last_name, role_id, manager_id }) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [first_name, last_name, role_id, manager_id],
        function (err) {
          if (err) throw err
          console.log(`${first_name} ${last_name} has been added to the database!`)
          start()
        }
      )
    })
}

// Add a new role to the table
function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the department id for the new role: ",
      name: "department_id",
    },
    {
      type: "input",
      message: "Enter the title of the new role: ",
      name: "title",
    },
    {
      type: "input",
      message: "Enter the salary of the new role: ",
      name: "salary",
    },
  ])
    .then(({ department_id, title, salary }) => {
      connection.query(
        "INSERT INTO role (department_id, title, salary) VALUES (?,?,?)",
        [department_id, title, salary],
        function (err) {
          if (err) throw err
          console.log(`The ${title} role has been added to the database!`)
          start()
        }
      )
    })
}

//* Add a new department to the table
function addDept() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the name of the new department: ",
      name: "deptName",
    },
  ])
    .then(({ deptName }) => {
      connection.query(
        "INSERT INTO department (dept_name) VALUES (?)",
        [deptName],
        function (err) {
          if (err) throw err
          console.log(`${deptName} department has been added to the database!`)
          start()
        }
      )
    })
}

//* Update an employee's role
function updateRole() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err
    let employee = res
    const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }))
    console.log(employeeChoices)
    inquirer.prompt([
      {
        type: "list",
        name: "employeeID",
        message: "Select an employee by ID to update their role: ",
        choices: employeeChoices,
      },
    ]).then((res) => {
      let employeeID = res.employeeID
      connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err
        let roles = res
        const roleChoices = roles.map(({ id, title }) => ({
          name: `${title}`,
          value: id,
        }))
        console.log(roleChoices)
        inquirer.prompt([
          {
            type: "list",
            name: "roleID",
            message: "Select a new role by ID: ",
            choices: roleChoices,
          },
        ]).then((res) => {
          connection.query(
            "UPDATE employee SET role_id =? WHERE id =?",
            [res.roleID, employeeID],
            function (err) {
              if (err) throw err
              console.log(`Employee's role updated!`)
              start()
            }
          )
        })
      })
    })
  })
}