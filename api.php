<?php
header("Content-Type: application/json");

function connectDB()
{
    $host = 'localhost';
    $user = 'portfolio_user';
    $password = 'portfolio_joang';
    $dbname = 'portfolio';

    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

    try {
        $pdo = new PDO($dsn, $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Conexión fallida: " . $e->getMessage()]);
        exit;
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $pdo = connectDB();
        $stmt = $pdo->query("SELECT * FROM portfolio_info LIMIT 1");
        $data = $stmt->fetch();
        echo json_encode($data);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Error al obtener los datos: " . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $pdo = connectDB();
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("UPDATE portfolio_info SET name = :name, profession = :profession, experience = :experience, email = :email WHERE id = 1");
        $stmt->execute([
            ':name' => $data['name'],
            ':profession' => $data['profession'],
            ':experience' => $data['experience'],
            ':email' => $data['email']
        ]);
        echo json_encode(["success" => true]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Error al actualizar los datos: " . $e->getMessage()]);
    }
}
