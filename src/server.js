const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

const docRoute = require('./routes/swaggerRoute');
const productRoute = require('./routes/productRoutes');

dotenv.config();

const server = express();
server.use(express.json());
server.set('json spaces', 2);

server.use('/api/v1/docs', docRoute);
server.use('/api/v1/product', productRoute);

const port = Number(process.env.PORT || 8083);
server.listen(port, () => {
    console.log(`Your port is ${port}`);
});

module.exports=server;
