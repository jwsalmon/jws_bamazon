CREATE DATABASE Bamazon_db;

USE Bamazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	ProductName VARCHAR(100) NOT NULL,
	DepartmentName VARCHAR(100) NOT NULL,
	Price DECIMAL(10,2) default 0,
	StockQuantity INT default 0,
	PRIMARY KEY(id)
);

INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity) 
VALUES ('POTENZA RE050', 'Tires', 166.75, 12),
       ('DRIVEGUARD', 'Tires', 202.99, 20),
       ('KINERGY ST', 'Tires', 67.54, 10),
       ('OPTIMO H724', 'Tires', 58.76, 33),
       ('May The Forced Induction Be With Classic T-Shirt', 'Apparel', 22.29, 10),
       ('Mechanic Flag Classic T-Shirt', 'Apparel', 22.29, 12),
       ('Challenge accepted Classic T-Shirt', 'Apparel', 22.29, 40),
       ('I saw the speed limit just did not see you Classic T-Shirt', 'Apparel', 22.95, 3),
       ('Beam Electronics Universal Smartphone Car Air Vent Mount', 'Accessories', 7.99, 4),
       ('LinkStyle Car Organizer Pocket', 'Accessories', 9.59, 20),
       ('illumiNITE High Performance Studio Enclosed Car Subwoofers', 'Electronics', 299.99, 2)

CREATE TABLE departments (
	DepartmentId INT NOT NULL AUTO_INCREMENT,
	DepartmentName VARCHAR(100) NOT NULL,
	OverheadCost DECIMAL(10,2) NOT NULL,
	TotalSales DECIMAL(10,2),
	PRIMARY KEY(DepartmentId)
);

INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Tires', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Apparel', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Electronics', 500);
INSERT INTO departments(DepartmentName, OverheadCost) VALUES('Accessories', 500);