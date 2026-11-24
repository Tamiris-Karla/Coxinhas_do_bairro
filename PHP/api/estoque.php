<?php
require_once __DIR__ . '/../config/bootstrap.php';
$user=require_role(['admin','root','fornecedor']);
try {
    if($_SERVER['REQUEST_METHOD']==='GET') {
        $sql='SELECT p.id produto_id,p.nome,p.categoria,e.quantidade,e.estoque_minimo,f.nome fornecedor FROM estoque e JOIN produtos p ON p.id=e.produto_id LEFT JOIN fornecedores f ON f.id=e.fornecedor_id';
        if($user['perfil']==='fornecedor') {
            $stmt=db()->prepare($sql.' WHERE f.usuario_id=?'); $stmt->execute([$user['id']]); $rows=$stmt->fetchAll();
        } else $rows=db()->query($sql)->fetchAll();
        respond(['estoque'=>$rows]);
    }
    if($_SERVER['REQUEST_METHOD']==='PATCH') {
        require_role(['admin','root']);
        $d=json_input(); $id=(int)($d['produto_id']??0); $q=(int)($d['quantidade']??-1); $min=(int)($d['estoque_minimo']??0);
        if($q<0||$min<0) respond(['erro'=>'Quantidade inválida.'],400);
        $stmt=db()->prepare('UPDATE estoque SET quantidade=?,estoque_minimo=? WHERE produto_id=?');
        $stmt->execute([$q,$min,$id]);
        audit((int)$user['id'],'estoque_atualizado','estoque',$id,null,$d);
        respond(['mensagem'=>'Estoque atualizado.']);
    }
    respond(['erro'=>'Método não permitido.'],405);
} catch(Throwable $e) { respond(['erro'=>'Falha no estoque.','detalhe'=>$e->getMessage()],400); }
