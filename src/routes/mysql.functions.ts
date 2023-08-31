/*
SQL Normalization

1NF
Each record in a table must be uniquely identifiable
Each cell / column should contain a single value

2NF
Be in 1NF
No partial dependencies
AKA Single Column Primary Key that does not functionally dependant on any subset of candidate key relation

3NF
Be in 2NF
No transient dependencies
Should be no non-key attributes (attributes that are not part of the primary key) depending on other non-key attributes

BCNF (Boyce-Codd Normal Form)
Even when a database is in 3rd Normal Form, still there would be anomalies resulting if it has more than one Candidate Key.

4NF (Fourth Normal Form) Rules
If no database table instance contains two or more, independent and multivalued data describing the relevant entity, then it is in 4th Normal Form.

5NF (Fifth Normal Form) Rules
A table is in 5th Normal Form only if it is in 4NF and it cannot be decomposed into any number of smaller tables without loss of data.

6NF (Sixth Normal Form) Proposed
6th Normal Form is not standardized, yet however, it is being discussed by database experts for some time. Hopefully, we would have a clear & standardized definition for 6th Normal Form in the near future…

SELECT AVG(creditLimit) AS avgCreditLimit FROM customers;
SELECT SUM(amount) AS totalPayments FROM payments;
SELECT COUNT(*) AS shippedOrdersCount FROM orders WHERE status = 'Shipped';
SELECT MIN(orderDate) AS earliestOrderDate FROM orders;
SELECT MAX(orderDate) AS latestOrderDate FROM orders;
SELECT customerNumber, COUNT(orderNumber) AS numberOfOrders
FROM orders
GROUP BY customerNumber;

ALTER TABLE `example`.`likes`
ADD COLUMN `icon` VARCHAR(45) NULL AFTER `memberId`;

CREATE TABLE amigos (
    friendId1 INT NOT NULL,
    friendId2 INT NOT NULL,
    friendsDate TIMESTAMP default CURRENT_TIMESTAMP,
    PRIMARY KEY (friendId1, friendId2),
    FOREIGN KEY (friendId1) REFERENCES members(id),
    FOREIGN KEY (friendId2) REFERENCES members(id)
);

// SELF JOIN EXAMPLE
SELECT A.lastName, A.firstName, A.reportsTo,B.firstName,
B.lastName FROM employees A
JOIN employees B
ON A.reportsTo = B.employeeNumber;

//INNER JOIN
SELECT orders.orderNumber, customers.customerName
FROM orders
INNER JOIN customers ON orders.customerNumber = customers.customerNumber;

//LEFT OUTER JOIN
SELECT customers.customerName, payments.amount
FROM customers
LEFT JOIN payments ON customers.customerNumber = payments.customerNumber;

//RIGHT OUTER JOIN
SELECT orders.orderNumber, customers.customerName
FROM orders
RIGHT JOIN customers ON orders.customerNumber = customers.customerNumber;

// FULL OUTER JOIN
SELECT e1.firstName AS EmployeeName, e2.firstName AS ManagerName
FROM employees e1
FULL JOIN employees e2 ON e1.reportsTo = e2.employeeNumber;

// CROSS JOIN
SELECT productlines.productLine, orders.orderNumber
FROM productlines
CROSS JOIN orders;

// SELF JOIN
SELECT e1.firstName AS EmployeeName1, e2.firstName AS EmployeeName2
FROM employees e1, employees e2
WHERE e1.officeCode = e2.officeCode AND e1.employeeNumber <> e2.employeeNumber;

*/
