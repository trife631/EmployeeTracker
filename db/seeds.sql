INSERT INTO department
    (id, name)
VALUES
    (1, 'Sales'),
    (2, 'Engineering'),
    (3, 'Finance'),
    (4, 'Legal'),
    (5, "Board");

INSERT INTO role
    (department_id, title, salary)
VALUES
    (1, "CEO", 1000000),
    (2, "Sales Lead", 100000),
    (2, "Salesperson", 80000),
    (3, "Lead Engineer", 150000),
    (3, "Software Engineer", 120000),
    (4, "Accountant Manager", 160000),
    (4, "Accountant", 125000),
    (5, "Legal Team Lead", 250000),
    (5, "Lawyer", 190000);

-- Employee seeds
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Chris", "Williams", 1, null),
    ("John", "Rose", 2, 1),
    ("Kevin", "Palmer", 3, 3),
    ("Cole", "Trippet", 4, 1),
    ("Tyler", "Ways", 5, 4),
    ("Sean", "Blevins", 6, 1),
    ("George", "Thomas", 7, 5),
    ("Tristan", "Grey", 8, 1),
    ("Wesley", "Carter", 9, 6);
