<?php
try {
    $db = new PDO("pgsql:host=localhost;port=5433;dbname=js2204;user=js2204;password=lemi61zoivli");

    $Name = $_POST["Name"];
    $Message = $_POST["Message"];

    $stm= $db->prepare("SELECT pid FROM player WHERE name=?");
    $stm->execute(array($Name));

    if ($res=$stm->fetch()) {
        $stm = $db->prepare("INSERT INTO msg(pid, msg) VALUES (?,?)");
        $stm->execute(array($res['pid'], $Message));
    }

} catch (PDOException $e){
    die($e -> getMessage());
    echo "No connection";
}
?>