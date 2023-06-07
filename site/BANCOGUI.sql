CREATE DATABASE thechosen;

USE thechosen;

create table usuario(
id INT PRIMARY KEY AUTO_INCREMENT, 
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45),
genero CHAR(1) constraint check(genero in ('m', 'f', 'n'))
);

insert into usuario values
(null, 'guigas', 'gui@gui', '12', 'f');

select * from usuario;


create table quiz(
id INT AUTO_INCREMENT,
acertos INT,
erros INT,
fkUsuario INT,
      CONSTRAINT fkQu FOREIGN KEY (fkUsuario) REFERENCES usuario(id), 
          CONSTRAINT pkquiz PRIMARY KEY (id, fkUsuario));
          
          insert into quiz values 
          (null, 3, 2, 1)