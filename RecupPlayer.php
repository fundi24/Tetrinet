<?php
try {
    $db = new PDO("pgsql:host=localhost;port=5433;dbname=js2204;user=js2204;password=lemi61zoivli");

    $Name = $_GET["para1"];
    $Team = $_GET["para2"];

    if($Name !== "" && $Team !== ""){
        $stm= $db->prepare("SELECT pid FROM player WHERE name=? AND team=?");
        $stm->execute(array($Name, $Team));
        $response = $stm -> fetch();

        echo json_encode($response);
    }

} catch (PDOException $e){
    die($e -> getMessage());
    echo "No connection";
}
