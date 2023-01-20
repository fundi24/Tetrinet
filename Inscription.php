<?php
    try {
        $db = new PDO("pgsql:host=localhost;port=5433;dbname=js2204;user=js2204;password=lemi61zoivli");

        $Name = $_POST["para1"];
        $Team = $_POST["para2"];

        if(isset($Name) && $Name !== "" && isset($Team) && $Team !== ""){
            $stm= $db->prepare("SELECT * FROM player WHERE name=? AND team= ?");
            $stm->execute(array($Name, $Team));

            if ($res=$stm->fetch()) {
                echo "Connexion";
            }
            else {
                $stm = $db->prepare("INSERT INTO player(name, team) VALUES (?,?)");
                $stm->execute(array($Name, $Team));
                echo "Inscription";
            }
        }

    } catch (PDOException $e){
        die($e -> getMessage());
        echo "No connection";
    }