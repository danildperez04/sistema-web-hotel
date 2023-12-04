CREATE TABLE departments(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255)NOT NULL,
	PRIMARY KEY(id)
);
INSERT INTO departments(name, createdAt, updatedAt) VALUES('Esteli', NOW(), NOW()),('Madriz', NOW(), NOW()),('Nueva Segovia', NOW(), NOW()),('Managua', NOW(), NOW()),('Matagalpa', NOW(), NOW()),('Granada', NOW(), NOW()),('Rivas', NOW(), NOW()),('Rio San Juan', NOW(), NOW()),
('Chinandega', NOW(), NOW()),('Jinotega', NOW(), NOW()),('Chontales', NOW(), NOW()),('Leon', NOW(), NOW()), ('Masaya', NOW(), NOW()), ('Boaco', NOW(), NOW()),('Carazo', NOW(), NOW());

CREATE TABLE municipalities(
	id INT auto_increment NOT NULL,
	name VARCHAR(255) NOT NULL,
	departmentId INT,
	PRIMARY KEY(id),
	FOREIGN KEY(departmentId) REFERENCES departments(id)
);

INSERT INTO municipalities(name, departmentId) VALUES ('Esteli','1'),('La Trinidad','1'),('Pueblo Nuevo','1'),('San Nicolas','1'),('San Juan de Limay','1'), ('Condega','1');
INSERT INTO municipalities(name, departmentId) VALUES ('Somoto','2'),('San Lucas','2'),('San José de Cusmapa','2'),('Las Sabanas','2'),('Totogalpa','2'),('Telpaneca','2'),('Yalagüina','2'),('Palacagüina','2'),('San Juan del Río Coco','2');
INSERT INTO municipalities(name, departmentId) VALUES ('Ocotal','3'),('Quilalí','3'),('Santa María','3'),('El Jícaro','3'),('Wiwilí','3'),('Ciudad Antigua','3'),('Dipilto','3'),('Jalapa','3'),('Murra','3'),('Macuelizo','3'),('Mozonte','3');
INSERT INTO municipalities(name, departmentId) VALUES ('Managua','4'),('Mateare','4'),('Tipitapa','4'),('Ciudad Sandino','4'),('El Crucero','4'),('San Rafael del Sur','4'),('Villa el Carmen','4'),('San francisco libre','4'),('Ticuantepe','4');
INSERT INTO municipalities(name, departmentId) VALUES ('Rancho Grande','5'),('Río Blanco','5'),('San Isidro','5'),('El Tuma-La Dalia','5'),('Sébaco','5'),('Matagalpa','5'),('San Ramón','5'),('Muy Muy','5'),('Esquipulas','5'),('San Dionisio','5'),('Terrabona','5'), ('Ciudad Dario','5');
INSERT INTO municipalities(name, departmentId) VALUES ('Granada','6'),('Nandaime','6'),('Diriá','6'),('Diriomo','6');
INSERT INTO municipalities(name, departmentId) VALUES ('Rivas','7'),('Cárdenas','7'),('Tola','7'),('Buenos Aires','7'),('San Juan del Sur','7'),('Belén','7'),('San Jorge','7'),('Moyogalpa','7'),('Potolsí','7'),('Altagracia','7'),('El Ostional','7');
INSERT INTO municipalities(name, departmentId) VALUES ('San Carlos','8'),('El Castillo','8'),('El Almendro','8'),('San Juan del Norte','8'),('San Miguelito','8'),('Morrito','8');
INSERT INTO municipalities(name, departmentId) VALUES ('Chinandega','9'),('Chichigalpa','9'),('Tonala','9'),('San Francisco del Norte','9'),('El Viejo','9'),('San Pedro del Norte','9'),('Somotillo','9'),('Posoltega','9'),('El Realejo','9'),('Villa Nueva','9'),('Santo Tomas del Norte','9'),('Cinco Pinos','9'),('CorINTO','9' );
INSERT INTO municipalities(name, departmentId) VALUES ('Jinotega','10'),('El Cuá','10'),('Santa María de pantasma','10'),('San Rafael del Norte','10'),('San José de Bocay','10'),('Wiwilí','10'),('La Concordia','10'),('San Sebastián de Yalí','10'),('La Dalia','10');
INSERT INTO municipalities(name, departmentId) VALUES ('El Coral','11'),('Santo Tomás','11'),('Comalapa','11'),('El Almendro','11'),('Juigalpa','11'),('San Pedro de Lóvago','11'),('Cuapa','11'),('Acoyapa','11'),('Santo Domingo','11'),('El Ayote','11'),('La Libertad','11'),('Villa Sandino','11'),('La Gateada','11');
INSERT INTO municipalities(name, departmentId) VALUES ('León','12'),('Telica','12'),('El Sauce','12'),('Larreynaga','12'),('El Jicaral','12'),('Achuapa','12'),('La Paz Centro','12'),('Quezalguaque','12'),('Santa Rosa del Peñón','12'),('Nagarote','12');
INSERT INTO municipalities(name, departmentId) VALUES ('Masaya','13'),('Masatepe','13'),('Nindirí','13'),('La Concepción','13'),('Niquinohomo','13'),('Nandasmo','13'),('Tisma','13'),('Catarina','13'),('San Juan de Oriente','13');
INSERT INTO municipalities(name, departmentId) VALUES ('Boaco','14'),('Camoapa','14'),('San Lorenzo','14'),('Teustepe','14'),('San José de los Remantes','14'),('Santa Lucía','14');
INSERT INTO municipalities(name, departmentId) VALUES ('Jinotepe','15'),('El Rosario','15'),('La Paz','15'),('La Conquista','15'),('Diriamba','15'),('Dolores','15'),('San Marcos','15'),('Santa Teresa','15');