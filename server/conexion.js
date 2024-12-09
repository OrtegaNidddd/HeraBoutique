// Instalación previa: npm install mysql2

const mysql = require('mysql2');

// Configuración de la conexión
const connection = mysql.createConnection({
    host: 'localhost',     // Servidor de base de datos
    user: 'root',    // Usuario de MySQL
    password: 'nick0310l', // Contraseña
    database: 'hera_boutique' // Nombre de la base de datos
});

// Establecer conexión
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Ejemplo de consulta
connection.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
        console.error('Error en la consulta:', err);
        return;
    }
    console.log(results);
});

// Cerrar conexión cuando ya no la necesites
// connection.end();