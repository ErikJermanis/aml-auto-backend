const functions = require("firebase-functions");
const app = require('express')();
const cors = require('cors');

const checkToken = require('./utils/authMiddleware');
const { getCars, createCar, deleteCar } = require('./handlers/cars');

app.use(cors());

app.get('/cars', getCars);
app.post('/cars', checkToken, createCar);
app.delete('/cars/:id', checkToken, deleteCar);

exports.api = functions.region('europe-west1').https.onRequest(app);