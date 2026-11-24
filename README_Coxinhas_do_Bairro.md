# Coxinhas do Bairro

Site de venda de coxinhas, sobremesas, bebidas e acompanhamentos. O
projeto reúne o cardápio, carrinho de compras, cadastro e login de
clientes, fluxo de pedido, área administrativa e área de fornecedores.

## Funcionalidades

-   **Cardápio:** exibição de coxinhas, sobremesas, molhos e bebidas.
-   **Carrinho:** inclusão de produtos, alteração de quantidades e
    cálculo do subtotal.
-   **Cadastro e login de clientes:** criação de conta e acesso à área
    do cliente.
-   **Perfil do cliente:** consulta dos dados cadastrados e histórico de
    pedidos.
-   **Entrega:** preenchimento do endereço e cálculo do frete conforme a
    distância/bairro configurado no projeto.
-   **Pagamento e confirmação:** etapas de pagamento e finalização do
    pedido.
-   **Painel administrativo:** consulta de clientes, pedidos, carrinhos
    abandonados e solicitações de fornecedores; atualização do status
    dos pedidos e aprovação de fornecedores.
-   **Área Root:** painel separado para funções de controle e consulta
    de sessões/auditoria.
-   **Área do fornecedor:** consulta de produtos/estoque que precisam de
    reposição.
-   **Cadastro de fornecedor:** envio de cadastro para aprovação do
    administrador.

## Tecnologias

-   HTML
-   CSS
-   JavaScript
-   `localStorage` e `sessionStorage` do navegador para armazenar os
    dados usados pela versão atual.
-   MySQL (estrutura inicial documentada em `banco.sql`; não está
    conectada automaticamente ao site estático).

## Estrutura dos arquivos

  Arquivo/pasta                Finalidade
  ---------------------------- -----------------------------------------
  `index.html`                 Página inicial e cardápio
  `login.html`                 Login do cliente
  `cadastro.html`              Cadastro do cliente
  `perfil.html`                Dados do cliente e histórico de pedidos
  `carrinho.html`              Carrinho de compras
  `entrega.html`               Endereço e frete
  `pagamento.html`             Etapa de pagamento
  `sucesso.html`               Confirmação do pedido
  `login-admin.html`           Login administrativo
  `admin.html`                 Painel administrativo
  `root.html`                  Painel Root
  `fornecedor-login.html`      Login do fornecedor
  `cadastro-fornecedor.html`   Cadastro de fornecedor
  `fornecedor.html`            Área do fornecedor
  `script.js`                  Regras e funcionalidades do site
  `style.css`                  Estilos e layout
  `banco.sql`                  Estrutura SQL inicial
  `img/`                       Imagens utilizadas no cardápio
  `Doc_Sist_coxinhas.pdf`      Documento de apoio do sistema

## Como executar localmente

1.  Baixe ou clone este repositório.
2.  Abra a pasta do projeto no Visual Studio Code.
3.  Abra `index.html` no navegador. Para desenvolvimento, também é
    possível usar a extensão **Live Server** do VS Code.
4.  Navegue pelo cardápio e teste o fluxo de cadastro, login e pedido.

Não é necessário instalar dependências para abrir a versão estática
atual.

## Publicação no GitHub Pages

1.  Acesse **Settings** do repositório no GitHub.
2.  Abra **Pages**.
3.  Em **Build and deployment**, selecione **Deploy from a branch**.
4.  Escolha a branch principal (por exemplo, `main`) e a pasta
    `/ (root)`.
5.  Salve e aguarde a publicação.
6.  O arquivo inicial deve permanecer na raiz com o nome `index.html`.

## Armazenamento e limitações da versão atual

Esta versão é um site estático. Os dados de clientes, pedidos, carrinho,
sessões, auditoria e solicitações de fornecedores são manipulados no
navegador por meio de `localStorage`/`sessionStorage`.

Isso significa que:

-   os dados ficam no navegador e no dispositivo em que foram
    registrados;
-   não há sincronização automática entre dispositivos ou navegadores;
-   limpar os dados do navegador pode apagar os registros locais;
-   o `banco.sql` descreve uma estrutura de banco de dados, mas o
    JavaScript atual não faz conexão com MySQL;
-   o armazenamento no navegador não oferece segurança adequada para uma
    operação comercial real.

**Antes de usar com clientes reais:** implemente um backend e conecte-o
a um banco de dados. A autenticação, permissões de
administrador/Root/fornecedor, senhas, pedidos e pagamentos devem ser
validados no servidor. Não armazene senhas reais ou dados sensíveis no
JavaScript público nem confie apenas em verificações feitas no
navegador.

## Contas de demonstração

O código atual contém contas de demonstração definidas em `script.js`.
As credenciais estão visíveis no código-fonte do site, portanto devem
ser consideradas públicas e usadas somente para testes. Altere/remova
essas contas antes de qualquer uso real e nunca reutilize senhas
pessoais.

## Próximas melhorias recomendadas

-   Criar API/backend para autenticação e operações do sistema.
-   Conectar o banco MySQL usando o backend.
-   Implementar hash seguro de senhas no servidor.
-   Integrar um provedor de pagamento real, sem armazenar dados de
    cartão no site.
-   Validar permissões e operações administrativas no servidor.
-   Adicionar testes e documentação de implantação do backend.

## Licença

Nenhuma licença foi especificada neste repositório. Se o projeto for
compartilhado publicamente, defina uma licença de uso conforme a
intenção dos responsáveis.
