// ----------------------------------------------
// Importation de la lib pour générer le json swagger
// ----------------------------------------------
const swaggerJsDoc = require('swagger-jsdoc');


// ----------------------------------------------
// Définition de l'architecture de base de la documentation
// ----------------------------------------------
const swaggerGeneration = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'projet_produits_node',
            version: '0.1.0'
        },
        servers: [
            {
                url: "http://localhost:8083/",
            },
        ],
    },
    apis: ['src/routes/*.js']  // On importe toutes les routes du projet
};

const swaggerOptions = swaggerJsDoc(swaggerGeneration); // On applique l'architecture de base de la documentation


const swaggerSortByHTTPRequest = {
    swaggerOptions: {
        operationsSorter: (httpRequest_first_index, httpRequest_second_index) => {
            const methodsOrder = ["get", "post", "put", "patch", "delete", "options", "trace"];
            let result = methodsOrder.indexOf(httpRequest_first_index.get("method")) - methodsOrder.indexOf(httpRequest_second_index.get("method"));

            if (result === 0) {
                result = httpRequest_first_index.get("path").localeCompare(httpRequest_second_index.get("path"));
            }
            return result;
        }
    }
};

module.exports = {
    swaggerOptions,
    swaggerSortByHTTPRequest
}