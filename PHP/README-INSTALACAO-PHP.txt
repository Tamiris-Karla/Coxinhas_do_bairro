COXINHAS DO BAIRRO — BACKEND PHP INICIAL

ESTRUTURA
- api/: endpoints JSON (autenticação, produtos, pedidos, fornecedores, painel e estoque)
- config/: conexão PDO e funções comuns
- banco_coxinhas_com_cardapio.sql: banco e os 17 produtos do cardápio

INSTALAÇÃO LOCAL NO XAMPP (Mac)
1. Instale/abra o XAMPP e inicie Apache e MySQL.
2. No phpMyAdmin, crie/importa o banco coxinhas_bairro.
3. Importe o arquivo banco_coxinhas_com_cardapio.sql fornecido junto ao projeto.
4. Copie a pasta Coxinhas_do_Bairro_PHP para /Applications/XAMPP/xamppfiles/htdocs/
5. A API ficará em http://localhost/Coxinhas_do_Bairro_PHP/api/
6. Teste produtos abrindo http://localhost/Coxinhas_do_Bairro_PHP/api/produtos.php

IMPORTANTE — INTEGRAÇÃO AINDA NECESSÁRIA
O site atual é HTML/JavaScript e usa localStorage. Estes arquivos implementam uma API PHP inicial,
mas não convertem automaticamente as páginas existentes para consumir a API. O próximo passo é
alterar script.js e os formulários para chamar estes endpoints via fetch(), e servir o site pelo
Apache em localhost (não pelo GitHub Pages). GitHub Pages não executa PHP.

AJUSTE DO BANCO
O SQL precisa ter a versão compatível com estes endpoints: tabelas usuarios, fornecedores,
pedidos com usuario_id/status/criado_em, produtos com ativo, estoque, auditoria, sessoes e itens_pedido.
Use o arquivo SQL incluído neste pacote, não uma cópia antiga do banco.sql.

SEGURANÇA
- Credenciais padrão do XAMPP são apenas para desenvolvimento local.
- Não publique config/database.php com senhas reais.
- Crie usuário MySQL próprio e senha antes de produção.
- Configure CORS para o domínio exato e use HTTPS.
- Nunca confie em valores de preço enviados pelo navegador; a API consulta preços no banco.
- Pagamento real exige integração com provedor e confirmação no servidor.
- Não use senhas demonstrativas antigas em produção.
