<?php
try {
    $db = new PDO("pgsql:host=localhost;port=5433;dbname=js2204;user=js2204;password=lemi61zoivli");

    $NameParty = $_POST["para1"];
    $TeamParty = $_POST["para2"];
    $Message = $_POST["para3"];

    if(isset($NameParty) && $NameParty !== "" && isset($TeamParty) && $TeamParty !== "" && isset($Message) && $Message !== ""){

        $stm= $db->prepare("SELECT pid FROM player WHERE name=? AND team=?");
        $stm->execute(array($NameParty, $TeamParty));

        if ($res=$stm->fetch()) {
            $stm = $db->prepare("INSERT INTO msg(pid, msg) VALUES (?,?)");
            $stm->execute(array($res['pid'], $Message));
        }
    }

} catch (PDOException $e){
    die($e -> getMessage());
    echo "No connection";
}