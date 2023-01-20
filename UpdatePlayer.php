<?php
try {
    $db = new PDO("pgsql:host=localhost;port=5433;dbname=js2204;user=js2204;password=lemi61zoivli");

    $Name = $_POST["para1"];
    $Team = $_POST["para2"];
    $lines = $_POST["para3"];
    $lost = $_POST["para4"];

    if($Name !== "" && $Team !== ""){
        $stm= $db->prepare("SELECT pid FROM player WHERE name=? AND team=?");
        $stm->execute(array($Name, $Team));

        if ($res=$stm->fetch()) {
            $stm = $db->prepare("UPDATE player SET lost=?, lines=? WHERE pid=?");
            $stm->execute(array($lost, $lines, $res['pid']));
        }
    }

} catch (PDOException $e){
    die($e -> getMessage());
    echo "Error update";
}
