CREATE DATABASE IF NOT EXISTS coxinhas_bairro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE coxinhas_bairro;

CREATE TABLE IF NOT EXISTS usuarios (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(120) NOT NULL,
 email VARCHAR(190) NOT NULL UNIQUE,
 senha_hash VARCHAR(255) NOT NULL,
 perfil ENUM('cliente','admin','root','fornecedor') NOT NULL DEFAULT 'cliente',
 ativo TINYINT(1) NOT NULL DEFAULT 1,
 criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS clientes (
 id INT AUTO_INCREMENT PRIMARY KEY,
 usuario_id INT NOT NULL UNIQUE,
 telefone VARCHAR(30) NULL,
 rua VARCHAR(150) NULL,
 numero VARCHAR(30) NULL,
 bairro VARCHAR(100) NULL,
 cidade VARCHAR(100) NULL,
 FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS fornecedores (
 id INT AUTO_INCREMENT PRIMARY KEY,
 usuario_id INT NULL UNIQUE,
 nome VARCHAR(120) NOT NULL,
 email VARCHAR(190) NOT NULL UNIQUE,
 categoria VARCHAR(40) NOT NULL,
 status ENUM('pendente','aprovado','rejeitado') NOT NULL DEFAULT 'pendente',
 ativo TINYINT(1) NOT NULL DEFAULT 0,
 criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS produtos (
 id INT PRIMARY KEY,
 categoria VARCHAR(30) NOT NULL,
 nome VARCHAR(120) NOT NULL,
 descricao VARCHAR(200),
 preco DECIMAL(10,2) NOT NULL,
 imagem VARCHAR(190),
 ativo TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS estoque (
 produto_id INT PRIMARY KEY,
 quantidade INT NOT NULL DEFAULT 0,
 estoque_minimo INT NOT NULL DEFAULT 0,
 fornecedor_id INT NULL,
 FOREIGN KEY (produto_id) REFERENCES produtos(id),
 FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pedidos (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 usuario_id INT NOT NULL,
 status ENUM('recebido','em_preparo','saiu_para_entrega','concluido','cancelado') NOT NULL DEFAULT 'recebido',
 criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 rua VARCHAR(150), numero VARCHAR(30), bairro VARCHAR(100), complemento VARCHAR(150),
 subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
 frete DECIMAL(10,2) NOT NULL DEFAULT 0,
 total DECIMAL(10,2) NOT NULL DEFAULT 0,
 FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS itens_pedido (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 pedido_id BIGINT NOT NULL,
 produto_id INT NULL,
 nome VARCHAR(120) NOT NULL,
 preco DECIMAL(10,2) NOT NULL,
 quantidade INT NOT NULL,
 FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
 FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sessoes (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 usuario_id INT NOT NULL,
 login_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 logout_em DATETIME NULL,
 FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS auditoria (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 usuario_id INT NULL,
 acao VARCHAR(80) NOT NULL,
 tabela_afetada VARCHAR(80),
 registro_id BIGINT NULL,
 dados_anteriores JSON NULL,
 dados_novos JSON NULL,
 criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS exclusoes (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 usuario_id INT NULL,
 tabela_afetada VARCHAR(80) NOT NULL,
 registro_id BIGINT NOT NULL,
 dados_excluidos JSON NOT NULL,
 excluido_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB;

INSERT INTO produtos (id,categoria,nome,descricao,preco,imagem) VALUES
(11,'coxinha','Coxinha de Camarão','Camarão cremoso com catupiry',22.00,'img/camarao.png'),
(12,'coxinha','Coxinha de Charque','Charque desfiado e bem temperado',12.50,'img/charque.png'),
(13,'coxinha','Coxinha de Frango','Frango desfiado • Massa crocante',10.50,'img/frango.png'),
(14,'coxinha','Coxinha de Queijo','Queijo derretido por dentro',12.00,'img/queijo.png'),
(15,'coxinha','Coxinha de Carne de Sol','Carne de sol com queijo coalho',18.00,'img/carne.png'),
(16,'coxinha','Coxinha Vegetariana','Legumes refogados e ervas',16.50,'img/jaca.png'),
(21,'sobremesa','Coxinha de Morango com Brigadeiro Tradicional','Morango com brigadeiro de chocolate',10.00,'img/morango1.png'),
(22,'sobremesa','Coxinha de Morango com Brigadeiro de Leite Ninho','Morango com brigadeiro de leite ninho',10.00,'img/morango2.png'),
(23,'sobremesa','Coxinha de Doce de Leite com Canela','Doce de leite cremoso e canela',10.00,'img/doce.png'),
(24,'sobremesa','Pudim de Leite Tradicional','Fatia com calda de caramelo',12.00,'img/pudim.png'),
(31,'molho','Molho de Pimenta','Picante artesanal',1.50,'img/pimenta.png'),
(32,'molho','Maionese Temperada','Alho e ervas',1.50,'img/maionese.png'),
(41,'bebida','Suco de Laranja 300ml','Natural, feito na hora',9.00,'img/laranja.png'),
(42,'bebida','Suco de Maracujá 300ml','Natural, feito na hora',9.00,'img/maracuja.png'),
(43,'bebida','Refrigerante Cola 350ml','Lata gelada',9.00,'img/coca.png'),
(44,'bebida','Guaraná 350ml','Lata gelada',9.00,'img/guarana.png'),
(45,'bebida','Água Mineral 500ml','Sem gás',4.00,'img/agua.png')
ON DUPLICATE KEY UPDATE categoria=VALUES(categoria),nome=VALUES(nome),descricao=VALUES(descricao),preco=VALUES(preco),imagem=VALUES(imagem);

INSERT IGNORE INTO estoque (produto_id,quantidade,estoque_minimo)
SELECT id,0,0 FROM produtos;

INSERT INTO fornecedores (nome,email,categoria,status,ativo)
VALUES ('Mercado Atual','mercadoatual@email.com','bebida','aprovado',1)
ON DUPLICATE KEY UPDATE categoria=VALUES(categoria),status='aprovado',ativo=1;
