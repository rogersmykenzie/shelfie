const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
require('dotenv').config();

const controller = require('./controller');

const app = express();

app.use(json());

massive(process.env.CONNECTION_STRING)
.then(db => {
    app.set('db', db);
    console.log('Database Connected');
})

app.get('/api/inventory', controller.getInventory);
app.post('/api/product', controller.createProduct);
app.delete('/api/product/:id', controller.deleteProduct);
app.put('/api/products/:id', controller.editProduct);

app.listen(4000, () => console.log('Listening on Port 4000'));