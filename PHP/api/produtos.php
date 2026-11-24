<?php
require_once __DIR__ . '/../config/bootstrap.php';
try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $sql = 'SELECT p.id,p.categoria,p.nome,p.descricao,p.preco,p.imagem,COALESCE(e.quantidade,0) AS estoque
                FROM produtos p LEFT JOIN estoque e ON e.produto_id=p.id WHERE p.ativo=1 ORDER BY p.id';
        respond(['produtos' => db()->query($sql)->fetchAll()]);
    }
    $user = require_role(['admin','root']);
    $data = json_input();
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        foreach (['id','categoria','nome','preco'] as $key) if (!isset($data[$key])) respond(['erro'=>"Campo obrigatório: $key"],400);
        $stmt=db()->prepare('INSERT INTO produtos (id,categoria,nome,descricao,preco,imagem,ativo) VALUES (?,?,?,?,?,?,1)');
        $stmt->execute([(int)$data['id'],$data['categoria'],$data['nome'],$data['descricao']??'',(float)$data['preco'],$data['imagem']??null]);
        db()->prepare('INSERT INTO estoque (produto_id,quantidade,estoque_minimo) VALUES (?,0,0)')->execute([(int)$data['id']]);
        audit((int)$user['id'],'produto_criado','produtos',(int)$data['id'],null,$data);
        respond(['mensagem'=>'Produto cadastrado.'],201);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
        $id=(int)($data['id']??0);
        $stmt=db()->prepare('UPDATE produtos SET nome=?,categoria=?,descricao=?,preco=?,imagem=? WHERE id=?');
        $stmt->execute([$data['nome'],$data['categoria'],$data['descricao']??'',(float)$data['preco'],$data['imagem']??null,$id]);
        audit((int)$user['id'],'produto_atualizado','produtos',$id,null,$data);
        respond(['mensagem'=>'Produto atualizado.']);
    }
    respond(['erro'=>'Método não permitido.'],405);
} catch (Throwable $e) { respond(['erro'=>'Falha ao consultar produtos.','detalhe'=>$e->getMessage()],500); }
