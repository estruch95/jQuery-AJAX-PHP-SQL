<?php
//Permiso para que el servidor atienda cualquier petición via AJAX
header('Access-Control-Allow-Origin: *');

if(!empty($_REQUEST['operacion'])){
    if($_REQUEST['operacion'] == 'may'){
        $texto = strtoupper($_REQUEST['texto']);
        echo $texto;
    } else if($_REQUEST['operacion'] == 'min'){
        $texto = strtolower($_REQUEST['texto']);
        echo $texto;
    } else{
        $texto = $_REQUEST['texto'];
        echo $texto;
    }
}

if( isset($_POST['nombre']) && isset($_POST['puesto']) ){
    
    $nombre = $_POST['nombre'];
    $puesto = $_POST['puesto'];

    echo "Nombre: ".$nombre. "<br>";  //Con echo devolvemos los datos por parte del servidor
    echo "Puesto: ".$puesto;
}

?>