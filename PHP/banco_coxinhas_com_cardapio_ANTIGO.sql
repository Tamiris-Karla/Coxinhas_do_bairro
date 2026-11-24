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
-- Cadastre senhas somente como hash seguro no backend. Não armazene senha em texto puro.

-- =========================================================
-- CARDÁPIO INICIAL: itens, descrições, preços e imagens
-- Dados extraídos do index.html do projeto Coxinhas do Bairro.
-- Estoque inicial fica em zero porque as quantidades reais
-- não foram informadas.
-- =========================================================
INSERT INTO produtos (id, categoria, nome, descricao, preco, imagem) VALUES
  (11, 'coxinha', 'Coxinha de Camarão', 'Camarão cremoso com catupiry', 22.00, 'img/camarao.png'),
  (12, 'coxinha', 'Coxinha de Charque', 'Charque desfiado e bem temperado', 12.50, 'img/charque.png'),
  (13, 'coxinha', 'Coxinha de Frango', 'Frango desfiado • Massa crocante', 10.50, 'img/frango.png'),
  (14, 'coxinha', 'Coxinha de Queijo', 'Queijo derretido por dentro', 12.00, 'img/queijo.png'),
  (15, 'coxinha', 'Coxinha de Carne de Sol', 'Carne de sol com queijo coalho', 18.00, 'img/carne.png'),
  (16, 'coxinha', 'Coxinha Vegetariana', 'Legumes refogados e ervas', 16.50, 'img/jaca.png'),
  (21, 'sobremesa', 'Coxinha de Morango com Brigadeiro Tradicional', 'Morango com brigadeiro de chocolate', 10.00, 'img/morango1.png'),
  (22, 'sobremesa', 'Coxinha de Morango com Brigadeiro de Leite Ninho', 'Morango com brigadeiro de leite ninho', 10.00, 'img/morango2.png'),
  (23, 'sobremesa', 'Coxinha de Doce de Leite com Canela', 'Doce de leite cremoso e canela', 10.00, 'img/doce.png'),
  (24, 'sobremesa', 'Pudim de Leite Tradicional', 'Fatia com calda de caramelo', 12.00, 'img/pudim.png'),
  (31, 'molho', 'Molho de Pimenta', 'Picante artesanal', 1.50, 'img/pimenta.png'),
  (32, 'molho', 'Maionese Temperada', 'Alho e ervas', 1.50, 'img/maionese.png'),
  (41, 'bebida', 'Suco de Laranja 300ml', 'Natural, feito na hora', 9.00, 'img/laranja.png'),
  (42, 'bebida', 'Suco de Maracujá 300ml', 'Natural, feito na hora', 9.00, 'img/maracuja.png'),
  (43, 'bebida', 'Refrigerante Cola 350ml', 'Lata gelada', 9.00, 'img/coca.png'),
  (44, 'bebida', 'Guaraná 350ml', 'Lata gelada', 9.00, 'img/guarana.png'),
  (45, 'bebida', 'Água Mineral 500ml', 'Sem gás', 4.00, 'img/agua.png')
ON DUPLICATE KEY UPDATE
  categoria=VALUES(categoria),
  nome=VALUES(nome),
  descricao=VALUES(descricao),
  preco=VALUES(preco),
  imagem=VALUES(imagem);

-- Fornecedor de bebidas já previsto no projeto.
INSERT INTO fornecedores (nome, email, categoria)
VALUES ('Mercado Atual', 'mercadoatual@email.com', 'bebida')
ON DUPLICATE KEY UPDATE categoria=VALUES(categoria);

-- Cadastro inicial do estoque para todos os itens.
-- Quantidade e estoque mínimo começam em zero para não inventar saldos.
INSERT INTO estoque (produto_id, quantidade, estoque_minimo, fornecedor_id) VALUES
  (11, 0, 0, NULL),
  (12, 0, 0, NULL),
  (13, 0, 0, NULL),
  (14, 0, 0, NULL),
  (15, 0, 0, NULL),
  (16, 0, 0, NULL),
  (21, 0, 0, NULL),
  (22, 0, 0, NULL),
  (23, 0, 0, NULL),
  (24, 0, 0, NULL),
  (31, 0, 0, NULL),
  (32, 0, 0, NULL),
  (41, 0, 0, (SELECT id FROM fornecedores WHERE email='mercadoatual@email.com' LIMIT 1)),
  (42, 0, 0, (SELECT id FROM fornecedores WHERE email='mercadoatual@email.com' LIMIT 1)),
  (43, 0, 0, (SELECT id FROM fornecedores WHERE email='mercadoatual@email.com' LIMIT 1)),
  (44, 0, 0, (SELECT id FROM fornecedores WHERE email='mercadoatual@email.com' LIMIT 1)),
  (45, 0, 0, (SELECT id FROM fornecedores WHERE email='mercadoatual@email.com' LIMIT 1))
ON DUPLICATE KEY UPDATE
  fornecedor_id=VALUES(fornecedor_id);
