const { render } = require("ejs");
const express = require("express");
const mysql = require("mysql2");

const app = express();
let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nick0310l",
    database: "hera_boutique"
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


//Ruta de Archivos Estaticos::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.use(express.static("public"));

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
    
    let buscar = "SELECT * FROM clientes WHERE cedula = '" + cedula + "'";

    conexion.query(buscar, function(err, resultado){
        if(err){
            console.log("Error: No se pudo conectar a la base de datos");
            res.render("form-registro.ejs");
        }else{
            if(resultado.length > 0){
                console.log("Error: El cédula ya está registrada");
                res.render("form-registro.ejs");
            }else{

                let registrar = "INSERT INTO clientes (nombres, apellidos, telefono, email, ciudad, genero, cumpleanos, cedula) VALUES (' " + nombres + "', '" + apellidos + "', '" + telefono + "', '" + email + "', '" + ciudad + "', '" + genero + "', '" + cumpleanos + "', '" + cedula + "')";

                conexion.query(registrar, function(err){
                    if(err){
                        res.render("form-registro.ejs");
                        console.log("Error: No se pudo registrar el cliente");
                    }else{
                        console.log("Datos registrados exitosamente");
                        res.render("form-registro.ejs");
                    }
                });
            }
        }
    });

    
});


//Puerto de la aplicación:::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.listen(3000, function(){
    console.log("Servidor ejecutándose en el puerto http://localhost:3000");
});
