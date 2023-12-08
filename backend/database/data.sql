CREATE TABLE departments(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY(id)
);

INSERT INTO
	departments(name, createdAt, updatedAt)
VALUES
	('Esteli', NOW(), NOW()),
	('Madriz', NOW(), NOW()),
	('Nueva Segovia', NOW(), NOW()),
	('Managua', NOW(), NOW()),
	('Matagalpa', NOW(), NOW()),
	('Granada', NOW(), NOW()),
	('Rivas', NOW(), NOW()),
	('Rio San Juan', NOW(), NOW()),
	('Chinandega', NOW(), NOW()),
	('Jinotega', NOW(), NOW()),
	('Chontales', NOW(), NOW()),
	('Leon', NOW(), NOW()),
	('Masaya', NOW(), NOW()),
	('Boaco', NOW(), NOW()),
	('Carazo', NOW(), NOW());

CREATE TABLE municipalities(
	id INT auto_increment NOT NULL,
	name VARCHAR(255) NOT NULL,
	departmentId INT,
	PRIMARY KEY(id),
	FOREIGN KEY(departmentId) REFERENCES departments(id)
);

INSERT INTO
	municipalities(name, departmentId, createdAt, updatedAt)
VALUES
	('Esteli', '1', NOW(), NOW()),
	('La Trinidad', '1', NOW(), NOW()),
	('Pueblo Nuevo', '1', NOW(), NOW()),
	('San Nicolas', '1', NOW(), NOW()),
	('San Juan de Limay', '1', NOW(), NOW()),
	('Condega', '1', NOW(), NOW()),
	('Somoto', '2', NOW(), NOW()),
	('San Lucas', '2', NOW(), NOW()),
	('San José de Cusmapa', '2', NOW(), NOW()),
	('Las Sabanas', '2', NOW(), NOW()),
	('Totogalpa', '2', NOW(), NOW()),
	('Telpaneca', '2', NOW(), NOW()),
	('Yalagüina', '2', NOW(), NOW()),
	('Palacagüina', '2', NOW(), NOW()),
	('San Juan del Río Coco', '2', NOW(), NOW()),
	('Ocotal', '3', NOW(), NOW()),
	('Quilalí', '3', NOW(), NOW()),
	('Santa María', '3', NOW(), NOW()),
	('El Jícaro', '3', NOW(), NOW()),
	('Wiwilí', '3', NOW(), NOW()),
	('Ciudad Antigua', '3', NOW(), NOW()),
	('Dipilto', '3', NOW(), NOW()),
	('Jalapa', '3', NOW(), NOW()),
	('Murra', '3', NOW(), NOW()),
	('Macuelizo', '3', NOW(), NOW()),
	('Mozonte', '3', NOW(), NOW()),
	('Managua', '4', NOW(), NOW()),
	('Mateare', '4', NOW(), NOW()),
	('Tipitapa', '4', NOW(), NOW()),
	('Ciudad Sandino', '4', NOW(), NOW()),
	('El Crucero', '4', NOW(), NOW()),
	('San Rafael del Sur', '4', NOW(), NOW()),
	('Villa el Carmen', '4', NOW(), NOW()),
	('San francisco libre', '4', NOW(), NOW()),
	('Ticuantepe', '4', NOW(), NOW()),
	('Rancho Grande', '5', NOW(), NOW()),
	('Río Blanco', '5', NOW(), NOW()),
	('San Isidro', '5', NOW(), NOW()),
	('El Tuma-La Dalia', '5', NOW(), NOW()),
	('Sébaco', '5', NOW(), NOW()),
	('Matagalpa', '5', NOW(), NOW()),
	('San Ramón', '5', NOW(), NOW()),
	('Muy Muy', '5', NOW(), NOW()),
	('Esquipulas', '5', NOW(), NOW()),
	('San Dionisio', '5', NOW(), NOW()),
	('Terrabona', '5', NOW(), NOW()),
	('Ciudad Dario', '5', NOW(), NOW()),
	('Granada', '6', NOW(), NOW()),
	('Nandaime', '6', NOW(), NOW()),
	('Diriá', '6', NOW(), NOW()),
	('Diriomo', '6', NOW(), NOW()),
	('Rivas', '7', NOW(), NOW()),
	('Cárdenas', '7', NOW(), NOW()),
	('Tola', '7', NOW(), NOW()),
	('Buenos Aires', '7', NOW(), NOW()),
	('San Juan del Sur', '7', NOW(), NOW()),
	('Belén', '7', NOW(), NOW()),
	('San Jorge', '7', NOW(), NOW()),
	('Moyogalpa', '7', NOW(), NOW()),
	('Potolsí', '7', NOW(), NOW()),
	('Altagracia', '7', NOW(), NOW()),
	('El Ostional', '7', NOW(), NOW()),
	('San Carlos', '8', NOW(), NOW()),
	('El Castillo', '8', NOW(), NOW()),
	('El Almendro', '8', NOW(), NOW()),
	('San Juan del Norte', '8', NOW(), NOW()),
	('San Miguelito', '8', NOW(), NOW()),
	('Morrito', '8', NOW(), NOW()),
	('Chinandega', '9', NOW(), NOW()),
	('Chichigalpa', '9', NOW(), NOW()),
	('Tonala', '9', NOW(), NOW()),
	('San Francisco del Norte', '9', NOW(), NOW()),
	('El Viejo', '9', NOW(), NOW()),
	('San Pedro del Norte', '9', NOW(), NOW()),
	('Somotillo', '9', NOW(), NOW()),
	('Posoltega', '9', NOW(), NOW()),
	('El Realejo', '9', NOW(), NOW()),
	('Villa Nueva', '9', NOW(), NOW()),
	('Santo Tomas del Norte', '9', NOW(), NOW()),
	('Cinco Pinos', '9', NOW(), NOW()),
	('Corinto', '9', NOW(), NOW()),
	('Jinotega', '10', NOW(), NOW()),
	('El Cuá', '10', NOW(), NOW()),
	('Santa María de pantasma', '10', NOW(), NOW()),
	('San Rafael del Norte', '10', NOW(), NOW()),
	('San José de Bocay', '10', NOW(), NOW()),
	('Wiwilí', '10', NOW(), NOW()),
	('La Concordia', '10', NOW(), NOW()),
	('San Sebastián de Yalí', '10', NOW(), NOW()),
	('La Dalia', '10', NOW(), NOW()),
	('El Coral', '11', NOW(), NOW()),
	('Santo Tomás', '11', NOW(), NOW()),
	('Comalapa', '11', NOW(), NOW()),
	('El Almendro', '11', NOW(), NOW()),
	('Juigalpa', '11', NOW(), NOW()),
	('San Pedro de Lóvago', '11', NOW(), NOW()),
	('Cuapa', '11', NOW(), NOW()),
	('Acoyapa', '11', NOW(), NOW()),
	('Santo Domingo', '11', NOW(), NOW()),
	('El Ayote', '11', NOW(), NOW()),
	('La Libertad', '11', NOW(), NOW()),
	('Villa Sandino', '11', NOW(), NOW()),
	('La Gateada', '11', NOW(), NOW()),
	('León', '12', NOW(), NOW()),
	('Telica', '12', NOW(), NOW()),
	('El Sauce', '12', NOW(), NOW()),
	('Larreynaga', '12', NOW(), NOW()),
	('El Jicaral', '12', NOW(), NOW()),
	('Achuapa', '12', NOW(), NOW()),
	('La Paz Centro', '12', NOW(), NOW()),
	('Quezalguaque', '12', NOW(), NOW()),
	('Santa Rosa del Peñón', '12', NOW(), NOW()),
	('Nagarote', '12', NOW(), NOW()),
	('Masaya', '13', NOW(), NOW()),
	('Masatepe', '13', NOW(), NOW()),
	('Nindirí', '13', NOW(), NOW()),
	('La Concepción', '13', NOW(), NOW()),
	('Niquinohomo', '13', NOW(), NOW()),
	('Nandasmo', '13', NOW(), NOW()),
	('Tisma', '13', NOW(), NOW()),
	('Catarina', '13', NOW(), NOW()),
	('San Juan de Oriente', '13', NOW(), NOW()),
	('Boaco', '14', NOW(), NOW()),
	('Camoapa', '14', NOW(), NOW()),
	('San Lorenzo', '14', NOW(), NOW()),
	('Teustepe', '14', NOW(), NOW()),
	('San José de los Remantes', '14', NOW(), NOW()),
	('Santa Lucía', '14', NOW(), NOW()),
	('Jinotepe', '15', NOW(), NOW()),
	('El Rosario', '15', NOW(), NOW()),
	('La Paz', '15', NOW(), NOW()),
	('La Conquista', '15', NOW(), NOW()),
	('Diriamba', '15', NOW(), NOW()),
	('Dolores', '15', NOW(), NOW()),
	('San Marcos', '15', NOW(), NOW()),
	('Santa Teresa', '15', NOW(), NOW());