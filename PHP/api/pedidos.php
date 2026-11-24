<?php
require_once __DIR__ . '/../config/bootstrap.php';
try {
    $user=require_login();
    if ($_SERVER['REQUEST_METHOD']==='GET') {
        if(in_array($user['perfil'],['admin','root'],true)) {
            $rows=db()->query('SELECT p.*,u.nome AS cliente_nome,u.email AS cliente_email FROM pedidos p JOIN usuarios u ON u.id=p.usuario_id ORDER BY p.criado_em DESC')->fetchAll();
        } else {
            $stmt=db()->prepare('SELECT * FROM pedidos WHERE usuario_id=? ORDER BY criado_em DESC');
            $stmt->execute([$user['id']]); $rows=$stmt->fetchAll();
        }
        respond(['pedidos'=>$rows]);
    }
    if ($_SERVER['REQUEST_METHOD']==='POST') {
        $d=json_input();
        if(empty($d['itens']) || !is_array($d['itens'])) respond(['erro'=>'Carrinho vazio.'],400);
        $pdo=db(); $pdo->beginTransaction();
        $subtotal=0; $itens=[];
        $find=$pdo->prepare('SELECT id,nome,preco FROM produtos WHERE id=? AND ativo=1');
        foreach($d['itens'] as $item) {
            $find->execute([(int)($item['produto_id']??0)]); $p=$find->fetch();
            $q=(int)($item['quantidade']??0);
            if(!$p || $q<1 || $q>99) throw new RuntimeException('Produto ou quantidade inválida.');
            $subtotal+=(float)$p['preco']*$q;
            $itens[]=[$p,$q];
        }
        $frete=max(0,(float)($d['frete']??0)); $total=$subtotal+$frete;
        $stmt=$pdo->prepare("INSERT INTO pedidos (usuario_id,status,rua,numero,bairro,complemento,subtotal,frete,total) VALUES (?,?,?,?,?,?,?,?,?)");
        $stmt->execute([$user['id'],'recebido',$d['rua']??null,$d['numero']??null,$d['bairro']??null,$d['complemento']??null,$subtotal,$frete,$total]);
        $pedidoId=(int)$pdo->lastInsertId();
        $ins=$pdo->prepare('INSERT INTO itens_pedido (pedido_id,produto_id,nome,preco,quantidade) VALUES (?,?,?,?,?)');
        foreach($itens as [$p,$q]) $ins->execute([$pedidoId,$p['id'],$p['nome'],$p['preco'],$q]);
        audit((int)$user['id'],'pedido_criado','pedidos',$pedidoId,null,['total'=>$total]);
        $pdo->commit();
        respond(['mensagem'=>'Pedido registrado.','pedido_id'=>$pedidoId,'subtotal'=>$subtotal,'frete'=>$frete,'total'=>$total],201);
    }
    if ($_SERVER['REQUEST_METHOD']==='PATCH') {
        require_role(['admin','root']);
        $d=json_input(); $id=(int)($d['id']??0); $status=$d['status']??'';
        $allowed=['recebido','em_preparo','saiu_para_entrega','concluido','cancelado'];
        if(!in_array($status,$allowed,true)) respond(['erro'=>'Status inválido.'],400);
        $stmt=db()->prepare('UPDATE pedidos SET status=? WHERE id=?'); $stmt->execute([$status,$id]);
        audit((int)$user['id'],'status_pedido_alterado','pedidos',$id,null,['status'=>$status]);
        respond(['mensagem'=>'Status atualizado.']);
    }
    respond(['erro'=>'Método não permitido.'],405);
} catch(Throwable $e) {
    if(isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
    respond(['erro'=>'Não foi possível processar o pedido.','detalhe'=>$e->getMessage()],400);
}
