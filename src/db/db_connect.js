// ----------------------------------------------
// Importation des modules nécéssaires
// ----------------------------------------------
const dotenv = require('dotenv');
const mysql = require('mysql');


// ----------------------------------------------
// Initialisation et configuration
// ----------------------------------------------
dotenv.config(); // Initialisation des variables d'environnements


// ----------------------------------------------
// Paramètres de connexion à la BDD
// ----------------------------------------------
const databaseConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'testnode'
});
// ----------------------------------------------
// Connexion à la base de données
// ----------------------------------------------
databaseConnection.connect((err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données :', err.message);
    } else {
        console.log('Connexion à la base de données réussie !');
    }
})


// ----------------------------------------------
// ----------------------------------------------
module.exports = databaseConnection;