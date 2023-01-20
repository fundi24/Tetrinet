<?php
try {
    $db = new PDO("pgsql:host=localhost;port=5433;dbname=js2204;user=js2204;password=lemi61zoivli");

    $resultats = $db->query("SELECT name, team, lines FROM player WHERE lines = (SELECT MAX(lines) FROM player)");
    $response = $resultats -> fetch();
    echo json_encode($response);

} catch (PDOException $e){
    die($e -> getMessage());
    echo "No connection";
}
