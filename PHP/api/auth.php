<?php
require_once __DIR__ . '/../config/bootstrap.php';
try {
    $data=json_input();
    if ($_SERVER['REQUEST_METHOD']==='GET') {
        $user=require_login();
        respond(['usuario'=>$user]);
    }
    if ($_SERVER['REQUEST_METHOD']!=='POST') respond(['erro'=>'Método não permitido.'],405);
    $action=$data['acao']??'login';

    if ($action==='cadastro') {
        foreach(['nome','email','senha'] as $k) if(empty($data[$k])) respond(['erro'=>"Informe $k."],400);
        if (!filter_var($data['email'],FILTER_VALIDATE_EMAIL)) respond(['erro'=>'E-mail inválido.'],400);
        if (strlen($data['senha'])<8) respond(['erro'=>'A senha deve ter pelo menos 8 caracteres.'],400);
        $hash=password_hash($data['senha'],PASSWORD_DEFAULT);
        $stmt=db()->prepare("INSERT INTO usuarios (nome,email,senha_hash,perfil,ativo) VALUES (?,?,?,'cliente',1)");
        $stmt->execute([$data['nome'],$data['email'],$hash]);
        $id=(int)db()->lastInsertId();
        $_SESSION['user']=['id'=>$id,'nome'=>$data['nome'],'email'=>$data['email'],'perfil'=>'cliente'];
        audit($id,'cadastro','usuarios',$id,null,['email'=>$data['email']]);
        respond(['mensagem'=>'Cadastro realizado.','usuario'=>$_SESSION['user']],201);
    }

    if ($action==='login') {
        $stmt=db()->prepare('SELECT id,nome,email,senha_hash,perfil,ativo FROM usuarios WHERE email=? LIMIT 1');
        $stmt->execute([$data['email']??'']);
        $u=$stmt->fetch();
        if(!$u || !$u['ativo'] || !password_verify($data['senha']??'', $u['senha_hash'])) respond(['erro'=>'E-mail ou senha inválidos.'],401);
        session_regenerate_id(true);
        $_SESSION['user']=['id'=>(int)$u['id'],'nome'=>$u['nome'],'email'=>$u['email'],'perfil'=>$u['perfil']];
        db()->prepare('INSERT INTO sessoes (usuario_id) VALUES (?)')->execute([$u['id']]);
        audit((int)$u['id'],'login','usuarios',(int)$u['id']);
        unset($u['senha_hash']);
        respond(['mensagem'=>'Login realizado.','usuario'=>$_SESSION['user']]);
    }
    if ($action==='logout') {
        $u=require_login();
        db()->prepare('UPDATE sessoes SET logout_em=NOW() WHERE usuario_id=? AND logout_em IS NULL ORDER BY id DESC LIMIT 1')->execute([$u['id']]);
        audit((int)$u['id'],'logout','usuarios',(int)$u['id']);
        $_SESSION=[];
        session_destroy();
        respond(['mensagem'=>'Sessão encerrada.']);
    }
    respond(['erro'=>'Ação inválida.'],400);
} catch (PDOException $e) {
    $code=$e->getCode()==='23000'?409:500;
    respond(['erro'=>$code===409?'E-mail já cadastrado.':'Erro ao processar autenticação.'], $code);
} catch(Throwable $e) { respond(['erro'=>'Erro interno.','detalhe'=>$e->getMessage()],500); }
