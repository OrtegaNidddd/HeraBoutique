const express = require('express'); // Importa Express
const bodyParser = require('body-parser'); // Para poder manejar los datos JSON
const mysql = require('mysql2'); // Para la conexión a MySQL

const app = express(); // Crea una instancia de Express
const port = 3000; // El puerto en el que escuchará el servidor

// Configura la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost', // Dirección del servidor de base de datos
    user: 'root', // Usuario de MySQL
    password: 'nick0310l', // Contraseña de MySQL
    database: 'hera_boutique', // Nombre de la base de datos
});

// Establecer conexión con la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Middleware para manejar datos JSON
app.use(bodyParser.json());

// Ruta para recibir los datos desde el frontend
app.post('/guardar_datos', (req, res) => {
    const { nombre, correo } = req.body; // Obtiene los datos del cuerpo de la solicitud

    // Validar que los datos estén presentes
    if (!nombre || !correo) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Realizar la consulta para guardar los datos en la base de datos
    const query = 'INSERT INTO clientes (nombre, correo) VALUES (?, ?)';
    connection.query(query, [nombre, correo], (err, result) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            return res.status(500).json({ error: 'Error al guardar los datos' });
        }
        res.status(200).json({ message: 'Datos guardados correctamente' }); // Responde al cliente con éxito
    });
});

// Servir archivos estáticos (HTML, JS)
app.use(express.static('public'));

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
