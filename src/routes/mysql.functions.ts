/*
SELECT AVG(creditLimit) AS avgCreditLimit FROM customers;
SELECT SUM(amount) AS totalPayments FROM payments;
SELECT COUNT(*) AS shippedOrdersCount FROM orders WHERE status = 'Shipped';
SELECT MIN(orderDate) AS earliestOrderDate FROM orders;
SELECT MAX(orderDate) AS latestOrderDate FROM orders;
SELECT customerNumber, COUNT(orderNumber) AS numberOfOrders
FROM orders
GROUP BY customerNumber;

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
