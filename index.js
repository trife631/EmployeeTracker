const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Wondestiny7",
    database: "employeeTracker"
});

db.connect(function (err) {
    if (err) throw err
    console.log("MySQL Connected")
    menu();
});


function menu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee', 'Quit']
            }]).then(response => {
                if (response.choice === 'View all Departments') {
                    viewDepartments()
                }
                else if (response.choice === 'View all Roles') {
                    viewRoles()
                }
                else if (response.choice === 'View all Employees') {
                    viewEmployees()
                }
                else if (response.choice === 'Add Department') {
                    addDepartment()
                }
                else if (response.choice === 'Add Role') {
                    addRole()
                }
                else if (response.choice === 'Add Employee') {
                    addEmployee()
                }
                else if (response.choice === 'Update Employee') {
                    updateEmployee()
                }
                else if (response.choice === 'Quit') {
                    console.log('Goodbye!');
                }
            })
}

function viewDepartments() {
    const query = `SELECT * FROM department`;
    db.query(query,
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}

function viewRoles() {
    const query = `SELECT * FROM role`;
    db.query(query,
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}

function viewEmployees() {
    const query = `SELECT * FROM employee`;
    db.query(query,
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?'
            }
        ]).then(res => {
            const query = `INSERT INTO department SET ?`
            db.query(
                query, {
                name: res.name
            }
            )
            console.log(`Added ${res.name} to the database`);
            menu()
        })
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'input',
                name: 'depId',
                message: 'Which department does the role belong to?'
            },
        ]).then(res => {
            const query = `INSERT INTO role SET ?`
            db.query(
                query, {
                title: res.name,
                salary: res.salary,
                department_id: res.depId
            }
            )
            console.log(`Added ${res.roleName} to the database`);
            menu()
        })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?"
            },
            {
                type: 'input',
                name: 'role',
                message: "What is the employee's role id?"
            },
            {
                type: 'input',
                name: 'manager',
                message: "What is the employee's manager id?"
            },
        ]).then(res => {
            const query = `INSERT INTO employee SET ?`
            db.query(
                query, {
                first_name: res.firstName,
                last_name: res.lastName,
                role_id: res.role,
                manager_id: res.manager
            }
            )
            console.log(`Added ${res.firstName} ${res.lastName} to the database`);
            menu()
        })
}

function updateEmployee() {
    const employeeSql = `SELECT * FROM employee`;
    db.query(employeeSql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "Which employee would you like to update?",
                choices: employees
            }
        ])
            .then(empChoice => {
                const employee = empChoice.name;
                const params = [];
                params.push(employee);

                const roleSql = `SELECT * FROM role`;

                db.query(roleSql, (err, data) => {
                    if (err) throw err;

                    const roles = data.map(({ id, title }) => ({ name: title, value: id }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: "What is the employee's new role?",
                            choices: roles
                        }
                    ])
                        .then(roleChoice => {
                            const role = roleChoice.role;
                            params.push(role);

                            let employee = params[0]
                            params[0] = role
                            params[1] = employee

                            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                            db.query(sql, params, (err, result) => {
                                if (err) throw err;
                                console.log("Employee has been updated!");

                                menu();
                            });
                        });
                });
            });
    });
};