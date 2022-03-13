<?php
//Permiso para que el servidor atienda cualquier petición via AJAX
header('Access-Control-Allow-Origin: *');

require_once "database.php";
$conexion = Conectar::conexion();

if($_REQUEST){
    
    $accion = $_REQUEST['accion'];
    
    if($accion == 'leer'){
        $arreglo = array();
        $sql = "SELECT id, nombre, puesto, edad FROM empleados";

        if($result = $conexion->query($sql)){
            while($row = $result->fetch_array(MYSQLI_ASSOC)){
                $arreglo[] = $row;
            }

            $jsonStr = json_encode($arreglo);
            echo $jsonStr;
        }
    }
    else if($accion == 'insertar'){

        if($_POST){
            
            $nombre = $_POST['nombre'];
            $puesto = $_POST['puesto'];
            $edad = $_POST['edad'];
            
            $sql = "INSERT INTO empleados (nombre, puesto, edad) VALUES ('$nombre', '$puesto', $edad)";
            if($conexion->query($sql) === TRUE){
                echo "1";
            } else {
                echo "0";
            }
        }

    }

}

$result->close();
$conexion->close();

?>