<?php

    class Conectar {

        public static function conexion(){
            
            $servidor = "localhost";
            $usuario = "root";
            $pass = "";
            $bd = "empleados";
            
            $conexion = new mysqli($servidor, $usuario, $pass, $bd);
            
            //echo "CONEXION BD OK.";
            
            return $conexion;
        }


    }

?>