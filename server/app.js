const { render } = require("ejs");
const express = require("express");
const mysql = require("mysql2");

require("dotenv").config();

const app = express();
let conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//Ruta de Archivos Dinamicos::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", function(req, res){
    res.render("index");
});

app.get("/registro", function(req, res){
    res.render("form-registro");
});

app.get("/finalizar-compra", function(req, res){
    res.render("finalizar-compra");
});


//Ruta de Archivos Estaticos::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.use(express.static("public"));

//Registro de Clientes::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.post("/validar", function(req, res){
    const datos = req.body;

    let nombres = datos.nombres;
    let apellidos = datos.apellidos;
    let email = datos.email;
    let telefono = datos.telefono;
    let cedula = datos.cedula;
    let ciudad = datos.ciudad;
    let genero = datos.genero;
    let cumpleanos = datos.cumpleanos;

    let mensaje;    
    let buscar = "SELECT * FROM clientes WHERE cedula = '" + cedula + "'";
    let success;

    conexion.query(buscar, function(err, resultado){
        if(err){
            mensaje = "Error: No se pudo conectar a la base de datos";
            res.render("form-registro.ejs", {mensaje});
        }else{
            if(resultado.length > 0){
                mensaje = "Error: La cédula ya está registrada";
                res.render("form-registro.ejs", {mensaje});
            }else{
                let registrar = "INSERT INTO clientes (nombres, apellidos, telefono, email, ciudad, genero, cumpleanos, cedula) VALUES (' " + nombres + "', '" + apellidos + "', '" + telefono + "', '" + email + "', '" + ciudad + "', '" + genero + "', '" + cumpleanos + "', '" + cedula + "')";
                conexion.query(registrar, function(err){
                    if(err){
                        mensaje = "Error: No se pudo registrar el cliente";
                        res.render("form-registro.ejs", {mensaje});
                    }else{
                        success = "Datos registrados exitosamente";
                        res.render("form-registro.ejs", {success});
                    }
                });
            }
        }
    });
});

/*
//Validación de compra:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.post("/validar-compra", function(req, res){
    const datos = req.body;
    let nombres = datos.nombres;
    let apellidos = datos.apellidos;
    let cedula = datos.cedula;
    let email = datos.email;
    let telefono = datos.telefono;
    let ciudad = datos.ciudad;

    let registrarCompra = "INSERT INTO ventas (nombres, apellidos, cedula, email, telefono, ciudad) VALUES ('" + nombres + "', '" + apellidos + "', '" + cedula + "', '" + email + "', '" + telefono + "', '" + ciudad + "')";
    conexion.query(registrarCompra, function(err){
        if(err){
            mensaje = "Error: No se pudo registrar la compra";
            res.render("finalizar-compra.ejs", {mensaje});
        }else{
            success = "Datos registrados exitosamente";
            res.render("finalizar-compra.ejs", {success});
        }
    });
});
*/

//Puerto de la aplicación:::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.listen(3000, function(){
    console.log("Servidor ejecutándose en el puerto http://localhost:3000");
});