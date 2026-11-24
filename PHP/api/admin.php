<?php
require_once __DIR__ . '/../config/bootstrap.php';
$user=require_role(['admin','root']);
try {
    if($_SERVER['REQUEST_METHOD']==='GET') {
        $pdo=db();
        respond([
            'clientes'=>(int)$pdo->query("SELECT COUNT(*) FROM usuarios WHERE perfil='cliente'")->fetchColumn(),
            'pedidos'=>(int)$pdo->query('SELECT COUNT(*) FROM pedidos')->fetchColumn(),
            'pedidos_abertos'=>(int)$pdo->query("SELECT COUNT(*) FROM pedidos WHERE status NOT IN ('concluido','cancelado')")->fetchColumn(),
            'carrinhos_abandonados'=>null,
            'ultimos_pedidos'=>$pdo->query('SELECT p.id,p.status,p.total,p.criado_em,u.nome cliente FROM pedidos p JOIN usuarios u ON u.id=p.usuario_id ORDER BY p.criado_em DESC LIMIT 50')->fetchAll(),
            'solicitacoes_fornecedor'=>$pdo->query("SELECT id,nome,email,categoria,status FROM fornecedores WHERE status='pendente' ORDER BY id")->fetchAll(),
            'auditoria'=> $user['perfil']==='root' ? $pdo->query('SELECT * FROM auditoria ORDER BY criado_em DESC LIMIT 100')->fetchAll() : []
        ]);
    }
    respond(['erro'=>'Método não permitido.'],405);
} catch(Throwable $e) { respond(['erro'=>'Falha ao carregar painel.','detalhe'=>$e->getMessage()],500); }
