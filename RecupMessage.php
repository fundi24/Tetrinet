<?php
try {
    $db = new PDO("pgsql:host=localhost;port=5433;dbname=js2204;user=js2204;password=lemi61zoivli");

    $resultats = $db->query("SELECT name, msg FROM msg INNER JOIN player on msg.pid = player.pid ORDER BY mid LIMIT 5");
    $messages = $resultats -> fetchAll();
    echo json_encode($messages);

} catch (PDOException $e){
    die($e -> getMessage());
    echo "No connection";
}
