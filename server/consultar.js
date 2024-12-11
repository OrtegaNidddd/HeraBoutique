const mysql = require("mysql2");
const express = require("express");

const app = express();
let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nick0310l",
    database: "hera_boutique"
});

let consultar = "SELECT * FROM clientes";

conexion.query(consultar, function(err, resultado){
    if(err){
        console.log("Error: No se pudo conectar a la base de datos");
    }else{
        console.log("Resultados de la consulta");
        console.log(resultado);
    }
});

conexion.end();