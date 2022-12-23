<?php
    try {
        $db = new PDO("pgsql:host=localhost;port=5433;dbname=js2204;user=js2204;password=lemi61zoivli");
        if ($db){
            $Server = $_POST["Server"];
            $NickName = $_POST["Nickname"];

            $result = $db->prepare("INSERT INTO Player (name, team) VALUES (?,?));
            $result->execute([$name, $NickName]);

            if ($row = $result -> fetch()){
                echo $row[0];
            } else {
                echo "0";
            }
        }
    } catch (PDOException $e){
        echo "No connection";
        die($e -> getMessage());
    }
?>