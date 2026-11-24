<?php
declare(strict_types=1);
require_once __DIR__ . '/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); // Em produção, restrinja ao domínio da loja.
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_set_cookie_params([
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    ]);
    session_start();
}

function json_input(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '[]', true);
    return is_array($data) ? $data : [];
}
function respond(array $data, int $status = 200): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
function require_login(): array {
    if (empty($_SESSION['user'])) respond(['erro' => 'Faça login para continuar.'], 401);
    return $_SESSION['user'];
}
function require_role(array $roles): array {
    $user = require_login();
    if (!in_array($user['perfil'], $roles, true)) respond(['erro' => 'Acesso não autorizado.'], 403);
    return $user;
}
function audit(?int $userId, string $action, ?string $table = null, ?int $recordId = null, $old = null, $new = null): void {
    $stmt = db()->prepare('INSERT INTO auditoria (usuario_id, acao, tabela_afetada, registro_id, dados_anteriores, dados_novos) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute([$userId, $action, $table, $recordId, $old === null ? null : json_encode($old), $new === null ? null : json_encode($new)]);
}
