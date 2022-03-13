$(document).ready(function () { 
    /*
    $(document).ready(function()) {
        
        $(function(){ = docReady pero abreviado

        });

        //Indicamos que jQuery se ejecuta cuando finalice la carga del HTML

        //jQuery se usa para manejar los eventos del DOM
    }
    */

    $('#leer').click(function (e) { 
        e.preventDefault();

        //Lectura de fichero de texto 
        $.get('archivo.txt', function (data, status, jqXHR) {
                console.log(status);
                console.log(data);  
                //console.log(jqXHR);
            },
        );

    });

    $('#leer_empleado').click(function (e) { 
        //e.preventDefault();

        //Lectura de JSON
        $.get('empleados.json', function (data, status, jqXHR) {
                console.log(status);
                console.log(data);
                //console.log(jqXHR);

                //Mostrar datos leídos de JSON en elemento HTML
                $('#datos_empleado').html(`
                    Nombre: ${data.nombre} <br>
                    Puesto: ${data.puesto} <br>
                    Edad: ${data.edad} <br>
                `);
        });
    });

    $('#leer_empleados').click(function (e) { 
        e.preventDefault();

        //Lectura de JSON (arreglo) con $.get
        $.get('empleados_arreglo.json', function (data, status, jqXHR) {
                
            console.log(status);
            console.log(data);

            //Método jquery para iterar un JSON
            $.each(data, function (index, item) { 
                 $('#lista_empleados').html($('#lista_empleados').html()+`
                    <li>${item.nombre} -- ${item.puesto} -- ${item.edad}</li>
                 `);
            });
        
        });
    });

    $('#leer_empleados_getjson').click(function (e) { 
        e.preventDefault();
        
        //$.get lee tanto formato JSON como .txt
        /*
        $.get('empleados_arreglo.txt', function (data, status, jqXHR) {
            console.log(status);
            
            //Conversión de cadena/string a JSON
            data = JSON.parse(data);
            console.log(data);     
        
        
        });
        */
        
        //$.getJSON solo lee formato JSON (no .txt)
        $.getJSON('empleados_arreglo_obj.json', function (data, status, jqXHR) {
            console.log(status);
            console.log(data.empleados);
            
            $('#lista_empleados').html(``);

            $.each(data.temporales, function (index, item) { 
                 $('#lista_empleados').html($('#lista_empleados').html()+`
                    <li>${item.nombre} -- ${item.puesto} -- ${item.edad}</li>
                 `);
            });
        
        });
    });




    let empleados;
    $.getJSON('empleados_arreglo_obj.json', function (data, status, jqXHR) {
        empleados = data.empleados;
    
    });

    $('#nombre').keyup(function (e) { 
       
        $('#lista_empleados').html(``);
        let nombre = $(this).val();
       
        $.each(empleados, function (index, item) { 
            
            if(item.nombre.toLowerCase().indexOf(nombre.toLowerCase()) != -1){
                $('#lista_empleados').html($('#lista_empleados').html()+`
                    <li>${item.nombre} -- ${item.puesto} -- ${item.edad}</li>
                 `);
            }

        });
    });


    $('#ajax').click(function (e) { 
        e.preventDefault();
        $('#lista_empleados').html(``);
        
        //Petición AJAX local a JSON
        $.ajax({
            type: "get",
            url: "empleados_arreglo_obj.json",
            dataType: "json",
            success: function (data) {
                
                console.log(data);
                $.each(data.empleados, function (index, item) { 
                     $('#lista_empleados').html($('#lista_empleados').html()+`
                        <li>${item.nombre} -- ${item.puesto} -- ${item.edad}</li>
                     `);
                });
            },
            error: function(xhr, status, error){
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        });
    });


    $('#convertir').click(function (e) { 
        e.preventDefault();
        $('#lista_empleados').html(``);
        //Obtención de los valores de los input
        let operacion = $('#operacion').val();
        let texto = $('#texto').val();
        //let datos = {'operacion': operacion, 'texto': texto};
        //Petición AJAX a servidor con método $.get de jquery
        $.get('http://localhost:8080/jqueryajax/convertir.php?operacion='+operacion+"&texto="+texto, function (data, status, jqXHR) {
            console.log(status);
            console.log(data);  
            $('#lista_empleados').html(data);
        });

    });


    $('form').submit(function (e) { //evento que ocurre cuando se presiona el botón enviar del formulario
        e.preventDefault();
        //Obtención de los valores de los input del formulario
        let nombre = $('#nombre_1').val();
        let puesto = $('#puesto_1').val();

        $.post('http://localhost:8080/jqueryajax/convertir.php',
        {'nombre': nombre, 'puesto': puesto},
            function (data, status, jqXHR) {
                $('#res').parent().removeClass('d-none');
                $('#res').html(data);
            
            }).done(function(){
                $('#estado').html('exito');
                $('#estado').addClass('alert-success');
                $('#estado').removeClass('d-none');
            }).fail(function(){
                $('#estado').html('fallo');
                $('#estado').addClass('alert-danger');
                $('#estado').removeClass('d-none');
            }).always(function(){
                console.log('finalizo');
            });

    });

    $('#leerEmpleados').click(function (e) { 
        e.preventDefault();
        $('#listaEmpleados').html(``);
        $.getJSON('http://localhost:8080/jqueryajax/empleados.php',
        {"accion":"leer"},
            function (data, status, jqXHR) {
                //console.log(status);
                //console.log(data);
                $.each(data, function (index, item) { 
                     $('#listaEmpleados').html($('#listaEmpleados').html()+`
                        <li> ${item.nombre} -- ${item.puesto} -- ${item.edad}</li>
                     `);
                });
            }
        );
    });

    $('#crearEmpleado').click(function (e) { 
        e.preventDefault();
        let nombre = $('#nombreEmpleado').val();
        let puesto = $('#puestoEmpleado').val();
        let edad = $('#edadEmpleado').val();

        $.post('http://localhost:8080/jqueryajax/empleados.php',
         {"accion":"insertar", "nombre":nombre, "puesto":puesto, "edad":edad},
            function (data, status, jqXHR) {
                console.log(data);
                if(data == 1){
                    $('#nombreEmpleado').val('');
                    $('#puestoEmpleado').val('');
                    $('#edadEmpleado').val('');

                }
            });
        });


        //EDITAR Y ELIMINAR SERIAN IGUAL QUE EL ÚLTIMO EJEMPLO



});