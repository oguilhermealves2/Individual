CREATE DATABASE thechosen;

USE thechosen;

CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT, 
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45),
genero CHAR(1) constraint check(genero in ('m', 'f', 'n'))
);

INSERT INTO usuario VALUES
(null, 'guigas', 'gui@gui', '12', 'f');

select * from usuario;


CREATE TABLE quiz(
id INT AUTO_INCREMENT,
acertos INT,
erros INT,
fkUsuario INT,
CONSTRAINT fkQu FOREIGN KEY (fkUsuario) REFERENCES usuario(id), 
CONSTRAINT pkquiz PRIMARY KEY (id, fkUsuario));
          
INSERT INTO quiz VALUES 
(null, 3, 2, 1);

CREATE TABLE comentarios(
idComentario INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT,
comentario VARCHAR(255),
dataPostagem DATETIME DEFAULT NOW(),
FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);