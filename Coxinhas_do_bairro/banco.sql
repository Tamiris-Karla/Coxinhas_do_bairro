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

-- Complemento: perfis, fornecedores, funcionários, sessões e auditoria.
CREATE TABLE IF NOT EXISTS fornecedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  categoria VARCHAR(40) NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS funcionarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  cargo VARCHAR(80),
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  perfil VARCHAR(30) NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS sessoes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  login_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  logout_em DATETIME NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE IF NOT EXISTS auditoria (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NULL,
  acao VARCHAR(80) NOT NULL,
  tabela_afetada VARCHAR(80),
  registro_id BIGINT NULL,
  dados_anteriores JSON NULL,
  dados_novos JSON NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE IF NOT EXISTS exclusoes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NULL,
  tabela_afetada VARCHAR(80) NOT NULL,
  registro_id BIGINT NOT NULL,
  dados_excluidos JSON NOT NULL,
  excluido_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE IF NOT EXISTS estoque (
  produto_id INT PRIMARY KEY,
  quantidade INT NOT NULL DEFAULT 0,
  estoque_minimo INT NOT NULL DEFAULT 0,
  fornecedor_id INT NULL,
  FOREIGN KEY (produto_id) REFERENCES produtos(id),
  FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)
);
INSERT INTO fornecedores (nome,email,categoria)
VALUES ('Mercado Atual','mercadoatual@email.com','bebida')
ON DUPLICATE KEY UPDATE categoria=VALUES(categoria);
-- Cadastre senhas somente como hash seguro no backend. Não armazene senha em texto puro.
