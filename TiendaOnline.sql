create database tienda;

use tienda;

CREATE TABLE IF NOT EXISTS users (
  idusers INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(245) NOT NULL,
  password VARCHAR(10) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idusers`)
);

INSERT INTO users (name, lastname, email, password, address, phone) values (
"Esteban","Tapia","estebantapia@gmail.com", "654321", "Itsur 15", "4451085653"
);

select * from users;

CREATE TABLE IF NOT EXISTS categories (
  idcategories INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description TEXT NULL,
  PRIMARY KEY (idcategories)
);

CREATE TABLE IF NOT EXISTS products (
  idproducts INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT NULL,
  unitPrice DECIMAL(10,2) NOT NULL,
  stock INT NULL,
  idusers INT NOT NULL,
  idcategories INT NOT NULL,
  PRIMARY KEY (idproducts, idusers, idcategories),
  CONSTRAINT fkUsuario FOREIGN KEY (idusers)
    REFERENCES users (idusers),
  CONSTRAINT fkCategoria FOREIGN KEY (idcategories)
    REFERENCES categories (idcategories)
);

CREATE TABLE IF NOT EXISTS multimedia (
  idmultimedia INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NULL,
  fileroute VARCHAR(100) NOT NULL,
  idproducts INT NOT NULL,
  PRIMARY KEY (idmultimedia),
  CONSTRAINT fkMultimedia
    FOREIGN KEY (idproducts)
    REFERENCES products (idproducts)
);

CREATE TABLE IF NOT EXISTS orders (
  idorders INT NOT NULL AUTO_INCREMENT,
  fechaPedido DATETIME NOT NULL,
  state ENUM("pendiente", "procesando", "enviado", "entregado", "cancelado") NULL,
  idusers INT NOT NULL,
  PRIMARY KEY (idorders),
  CONSTRAINT fkUsuarioOrders
    FOREIGN KEY (idusers)
    REFERENCES users (idusers)
);

CREATE TABLE IF NOT EXISTS orderDetails (
  idorderDetails INT NOT NULL AUTO_INCREMENT,
  cantidad INT NOT NULL,
  unitPrice DECIMAL(10,2) NOT NULL,
  idproducts INT NOT NULL,
  idorders INT NOT NULL,
  PRIMARY KEY (idorderDetails),
  CONSTRAINT fkOrderDetailsProducts
    FOREIGN KEY (idproducts)
    REFERENCES products (idproducts),
  CONSTRAINT fkOrderDetailsOrders
    FOREIGN KEY (idorders)
    REFERENCES orders (idorders)
);

CREATE TABLE IF NOT EXISTS pagoInfo (
  idpagoInfo INT NOT NULL AUTO_INCREMENT,
  tipo ENUM("Tarjeta Credito", "Tarjeta Debito") NOT NULL,
  nombreTitular VARCHAR(255) NOT NULL,
  numero VARCHAR(16) NOT NULL,
  fechaExpiracion VARCHAR(7) NOT NULL,
  cvv VARCHAR(4) NOT NULL,
  detalles TEXT NULL,
  users_idusers INT NOT NULL,
  PRIMARY KEY (idpagoInfo),
  CONSTRAINT fkPagoInfoUsuarios
    FOREIGN KEY (users_idusers)
    REFERENCES users (idusers)
);

CREATE TABLE IF NOT EXISTS pagos (
  idpagos INT NOT NULL AUTO_INCREMENT,
  monto DECIMAL(10,2) NOT NULL,
  fechaPago DATETIME NOT NULL,
  idorders INT NOT NULL,
  idpagoInfo INT NOT NULL,
  PRIMARY KEY (idpagos),
  CONSTRAINT fkPagoOrders
    FOREIGN KEY (idorders)
    REFERENCES orders (idorders),
  CONSTRAINT fkPagoPagoInfo
    FOREIGN KEY (idpagoInfo)
    REFERENCES pagoInfo (idpagoInfo)
);

CREATE TABLE IF NOT EXISTS envios (
  idenvios INT NOT NULL AUTO_INCREMENT,
  address VARCHAR(255) NOT NULL,
  metodoEnvio VARCHAR(100) NOT NULL,
  estadoEnvio ENUM("enviado", "proceso", "entregado"),
  fechaEstimadaEntrega DATE NOT NULL,
  idorders INT NOT NULL,
  PRIMARY KEY (idenvios),
  CONSTRAINT fkEnviosOrders
    FOREIGN KEY (idorders)
    REFERENCES orders (idorders)
);

CREATE TABLE IF NOT EXISTS wishlist (
  idwishlist INT NOT NULL AUTO_INCREMENT,
  fechaAgregado DATETIME NOT NULL,
  idusers INT NOT NULL,
  idproducts INT NOT NULL,
  PRIMARY KEY (idwishlist),
  CONSTRAINT fkWishlistUsers
    FOREIGN KEY (idusers)
    REFERENCES users (idusers),
  CONSTRAINT fkWishlistProducts
    FOREIGN KEY (idproducts)
    REFERENCES products (idproducts)
);

CREATE TABLE IF NOT EXISTS comentarios (
  idcomentarios INT NOT NULL AUTO_INCREMENT,
  rate INT NOT NULL,
  comentario TEXT NOT NULL,
  idproducts INT NOT NULL,
  idusers INT NOT NULL,
  PRIMARY KEY (idcomentarios),
  CONSTRAINT fkComentariosProducts
    FOREIGN KEY (idproducts)
    REFERENCES products (idproducts),
  CONSTRAINT fkComentariosUsers
    FOREIGN KEY (idusers)
    REFERENCES users (idusers)
);
    
    