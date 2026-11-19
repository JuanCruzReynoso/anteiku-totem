-- TP Integrador Anteiku - base de datos
CREATE DATABASE IF NOT EXISTS anteiku_totem CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE anteiku_totem;

CREATE TABLE products (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  image varchar(255) NOT NULL,
  category enum('coffee','merch') NOT NULL,
  price decimal(10,2) NOT NULL,
  active tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(255) NOT NULL,
  es_admin tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE sales (
  id int NOT NULL AUTO_INCREMENT,
  date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total_price decimal(10,2) NOT NULL,
  user_name varchar(240) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE product_sales (
  product_id int NOT NULL,
  sale_id int NOT NULL,
  cantidad int NOT NULL DEFAULT '1',
  KEY product_id (product_id, sale_id),
  KEY sale_id (sale_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE product_sales
  ADD CONSTRAINT product_sales_ibfk_1 FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT product_sales_ibfk_2 FOREIGN KEY (sale_id) REFERENCES sales (id) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO products (name, image, category, price, active) VALUES
('Bourbon (Brasil) - Tueste medio', '/uploads/products/anteiku-cup.jpg', 'coffee', 2800.00, 1),
('Bourbon (Brasil) - Tueste medio - Mediano', '/uploads/products/anteiku-cup.jpg', 'coffee', 3300.00, 1),
('Bourbon (Brasil) - Tueste medio - Grande', '/uploads/products/anteiku-cup.jpg', 'coffee', 3800.00, 1),
('Bourbon (Brasil) - Tueste medio - En grano 1/4 kg', '/uploads/products/burboun.jpg', 'coffee', 22000.00, 1),
('Bourbon (Brasil) - Tueste medio - En grano 1/2 kg', '/uploads/products/burboun.jpg', 'coffee', 30000.00, 1),
('Bourbon (Brasil) - Tueste medio - En grano 1 kg', '/uploads/products/burboun.jpg', 'coffee', 48000.00, 1),
('Bourbon (Brasil) - Tueste medio - Molido 1/4 kg', '/uploads/products/burboun.jpg', 'coffee', 22000.00, 1),
('Bourbon (Brasil) - Tueste medio - Molido 1/2 kg', '/uploads/products/burboun.jpg', 'coffee', 30000.00, 1),
('Bourbon (Brasil) - Tueste medio - Molido 1 kg', '/uploads/products/burboun.jpg', 'coffee', 48000.00, 1),
('Italian Blend (Brasil - Colombia) - Tueste alto', '/uploads/products/anteiku-cup.jpg', 'coffee', 2800.00, 1),
('Italian Blend (Brasil - Colombia) - Tueste alto - Mediano', '/uploads/products/anteiku-cup.jpg', 'coffee', 3300.00, 1),
('Italian Blend (Brasil - Colombia) - Tueste alto - Grande', '/uploads/products/anteiku-cup.jpg', 'coffee', 3800.00, 1),
('Italian Blend (Brasil - Colombia) - Tueste alto - En grano 1/4 kg', '/uploads/products/italian.jpg', 'coffee', 22000.00, 1),
('Italian Blend (Brasil - Colombia) - Tueste alto - En grano 1/2 kg', '/uploads/products/italian.jpg', 'coffee', 30000.00, 1),
('Italian Blend (Brasil - Colombia) - Tueste alto - En grano 1 kg', '/uploads/products/italian.jpg', 'coffee', 48000.00, 1),
('Italian Blend (Brasil - Colombia) - Tueste alto - Molido 1/4 kg', '/uploads/products/italian.jpg', 'coffee', 22000.00, 1),
('Italian Blend (Brasil - Colombia) - Tueste alto - Molido 1/2 kg', '/uploads/products/italian.jpg', 'coffee', 30000.00, 1),
('Italian Blend (Brasil - Colombia) - Tueste alto - Molido 1 kg', '/uploads/products/italian.jpg', 'coffee', 48000.00, 1),
('Cuaderno Death Note', '/uploads/products/deathnote-cuaderno.png', 'merch', 5500.00, 1),
('Cuaderno Totoro', '/uploads/products/totoro-cuaderno.png', 'merch', 5500.00, 1),
('Mug Anteiku', '/uploads/products/anteiku-mug.jpg', 'merch', 7000.00, 1),
('Remera Gash Bell', '/uploads/products/gashbell-perversito-remera.png', 'merch', 12000.00, 1),
('Remera Hisoka Almendra', '/uploads/products/hisoka-almendra-remera.png', 'merch', 12000.00, 1),
('Remera Mr Popo Igor', '/uploads/products/mrpopo-igor-remera.png', 'merch', 12000.00, 1),
('Chomba White Pony', '/uploads/products/whitepony-chomba.png', 'merch', 15000.00, 1),
('Cuaderno Death Note (agotado)', '/uploads/products/deathnote-cuaderno.png', 'merch', 5500.00, 0);

INSERT INTO users (name, email, password, es_admin) VALUES
('admin', 'admin@anteiku.com', '$2b$10$5VM6gXPEJjXoDKtz0VwNKulbAXVaFZLLL6UleuW6H5P5WRftLAavq', 1);

INSERT INTO sales (user_name, total_price) VALUES
('Fran', 8300.00),
('Touka', 29800.00),
('Kaneki', 5500.00);

INSERT INTO product_sales (product_id, sale_id, cantidad) VALUES
(1, 1, 1),
(3, 1, 1),
(2, 2, 1),
(6, 2, 1),
(8, 2, 1),
(4, 3, 1);
