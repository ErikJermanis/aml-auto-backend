const functions = require("firebase-functions");
const app = require('express')();
const cors = require('cors');

const checkToken = require('./utils/authMiddleware');
const { getCars, getSingleCar, createCar, deleteCar, updateCar } = require('./handlers/cars');
const { getReservations, createReservation, deleteReservation } = require('./handlers/reservations');

app.use(cors());

app.get('/cars', getCars);
app.get('/cars/:id', checkToken, getSingleCar);
app.post('/cars', checkToken, createCar);
app.put('/cars/:id', checkToken, updateCar);
app.delete('/cars/:id', checkToken, deleteCar);

app.get('/reservations', getReservations);
app.post('/reservations', createReservation);
app.delete('/reservations/:id', checkToken, deleteReservation);

exports.api = functions.region('europe-west1').https.onRequest(app);