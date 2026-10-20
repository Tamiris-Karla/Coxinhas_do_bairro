CREATE TABLE clientes (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nome      VARCHAR(120) NOT NULL,
  email     VARCHAR(120) NOT NULL UNIQUE,
  senha     VARCHAR(255) NOT NULL,      -- guardada "embaralhada" (hash), nunca em texto puro
  telefone  VARCHAR(30),
  rua       VARCHAR(120),
  numero    VARCHAR(20),
  bairro    VARCHAR(80),
  cidade    VARCHAR(80)
);


CREATE TABLE pedidos (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id   INT NOT NULL,
  data         DATETIME DEFAULT CURRENT_TIMESTAMP,
  rua          VARCHAR(120),
  numero       VARCHAR(20),
  bairro       VARCHAR(80),
  complemento  VARCHAR(120),
  km           DECIMAL(5,1),
  subtotal     DECIMAL(8,2),
  frete        DECIMAL(8,2),
  total        DECIMAL(8,2),
  parcelas     INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);


CREATE TABLE itens_pedido (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id   INT NOT NULL,
  produto_id  INT,
  nome        VARCHAR(120),
  preco       DECIMAL(8,2),
  quantidade  INT,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

CREATE TABLE produtos (
  id         INT PRIMARY KEY,
  categoria  VARCHAR(20) NOT NULL,      
  nome       VARCHAR(120) NOT NULL,
  descricao  VARCHAR(200),
  preco      DECIMAL(8,2) NOT NULL,
  imagem     VARCHAR(120)              
);