<?php
require_once __DIR__ . '/../config/bootstrap.php';
try {
    $d=json_input();
    if($_SERVER['REQUEST_METHOD']==='POST' && ($d['acao']??'')==='cadastro') {
        foreach(['nome','email','senha','categoria'] as $k) if(empty($d[$k])) respond(['erro'=>"Informe $k."],400);
        if(strlen($d['senha'])<8) respond(['erro'=>'A senha deve ter pelo menos 8 caracteres.'],400);
        $pdo=db(); $pdo->beginTransaction();
        $hash=password_hash($d['senha'],PASSWORD_DEFAULT);
        $stmt=$pdo->prepare("INSERT INTO usuarios (nome,email,senha_hash,perfil,ativo) VALUES (?,?,?,'fornecedor',0)");
        $stmt->execute([$d['nome'],$d['email'],$hash]); $uid=(int)$pdo->lastInsertId();
        $stmt=$pdo->prepare('INSERT INTO fornecedores (nome,email,categoria,usuario_id,ativo,status) VALUES (?,?,?, ?,0,?)');
        $stmt->execute([$d['nome'],$d['email'],$d['categoria'],$uid,'pendente']);
        audit($uid,'solicitacao_fornecedor','fornecedores',(int)$pdo->lastInsertId());
        $pdo->commit();
        respond(['mensagem'=>'Cadastro enviado. Aguarde aprovação do administrador.'],201);
    }
    $user=require_role(['fornecedor','admin','root']);
    if($_SERVER['REQUEST_METHOD']==='GET') {
        if($user['perfil']==='fornecedor') {
            $stmt=db()->prepare("SELECT p.id,p.nome,p.categoria,e.quantidade,e.estoque_minimo FROM produtos p JOIN estoque e ON e.produto_id=p.id JOIN fornecedores f ON f.id=e.fornecedor_id WHERE f.usuario_id=?");
            $stmt->execute([$user['id']]); respond(['produtos'=>$stmt->fetchAll()]);
        }
        respond(['fornecedores'=>db()->query('SELECT id,nome,email,categoria,status,ativo FROM fornecedores ORDER BY id DESC')->fetchAll()]);
    }
    if($_SERVER['REQUEST_METHOD']==='PATCH') {
        require_role(['admin','root']);
        $id=(int)($d['id']??0); $status=$d['status']??'';
        if(!in_array($status,['aprovado','rejeitado'],true)) respond(['erro'=>'Status inválido.'],400);
        $pdo=db(); $pdo->beginTransaction();
        $pdo->prepare('UPDATE fornecedores SET status=?,ativo=? WHERE id=?')->execute([$status,$status==='aprovado'?1:0,$id]);
        $pdo->prepare("UPDATE usuarios SET ativo=?,perfil='fornecedor' WHERE id=(SELECT usuario_id FROM fornecedores WHERE id=?)")->execute([$status==='aprovado'?1:0,$id]);
        audit((int)$user['id'],'fornecedor_'.$status,'fornecedores',$id);
        $pdo->commit(); respond(['mensagem'=>'Cadastro atualizado.']);
    }
    respond(['erro'=>'Método não permitido.'],405);
} catch(Throwable $e) { if(isset($pdo)&&$pdo->inTransaction())$pdo->rollBack(); respond(['erro'=>'Falha ao processar fornecedor.','detalhe'=>$e->getMessage()],400); }
