<?php

$transacciones = array();

function registrarTransaccion($id, $descripcion, $monto){
    global $transacciones;

    $transaccion = array("id" => $id, "descripcion" => $descripcion, "monto" => $monto);
    array_push($transacciones, $transaccion);
}

function escribir($archivo, $texto){
    echo $texto . "<br>";
    fwrite($archivo, $texto . "\n");
}

function generarEstadoDeCuenta(){
    global $transacciones;

    $archivo = fopen("estado_cuenta.txt", "w") or die("No se puede crear el archivo");

    escribir($archivo, "ESTADO DE CUENTA");
    escribir($archivo, "");

    $total = 0;
    foreach ($transacciones as $transaccion){
        escribir($archivo, "id: " . $transaccion["id"] . " | descripcion: " . $transaccion["descripcion"] . " | monto: " . $transaccion["monto"]);
        $total = $total + $transaccion["monto"];
    }

    $interes = $total * 0.026;
    $conInteres = $total + $interes;
    $cashBack = $total * 0.001;
    $pagar = $conInteres - $cashBack;

    escribir($archivo, "");
    escribir($archivo, "Total de contado: " . $total);
    escribir($archivo, "Interes (2.6%): " . $interes);
    escribir($archivo, "Monto con interes: " . $conInteres);
    escribir($archivo, "Cash back (0.1%): " . $cashBack);
    escribir($archivo, "Monto final a pagar: " . $pagar);

    fclose($archivo);
}

registrarTransaccion(1, "Supermercado", 25000);
registrarTransaccion(2, "Gasolina", 15000);
registrarTransaccion(3, "Restaurante", 12000);
registrarTransaccion(4, "Farmacia", 8500);
registrarTransaccion(5, "Ropa", 40000);

generarEstadoDeCuenta();
