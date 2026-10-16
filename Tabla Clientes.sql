CREATE DATABASE ListadoClientes
Go
USE ListadoClientes
GO

CREATE TABLE Clientes (
	ClienteID INT IDENTITY(1,1) PRIMARY KEY,
	Nombre VARCHAR(100) NOT NULL,
	Apellido VARCHAR(100) NOT NULL,
	Correo VARCHAR(100) NOT NULL,
	Direccion VARCHAR(300) NOT NULL,
	DPI CHAR(13),
);

INSERT INTO Clientes(Nombre, Apellido, Correo, Direccion, DPI)
VALUES('Andrea', 'Miranda', 'correo@gmail.com', 'Guatemala', '1234567891234')