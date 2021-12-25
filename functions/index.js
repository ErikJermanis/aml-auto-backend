const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require('express')();

admin.initializeApp();

// GET cars
app.get('/cars', (req, res) => {
  admin
    .firestore()
    .collection("cars")
    .get()
    .then(snapshot => {
      let cars = [];
      snapshot.forEach(doc => cars.push({ id: doc.id, ...doc.data() }));
      return res.json(cars);
    })
    .catch(err => console.log(err));
});

// POST create a car
app.post('/cars', (req, res) => {
  admin
    .firestore()
    .collection('cars')
    .add({ ...req.body, createdAt: new Date().toISOString() })
    .then(doc => res.json({ message: `document ${doc.id} created successfully` }))
    .catch(err => res.status(500).json({ error: 'something went wrong' }));
});

exports.api = functions.region('europe-west1').https.onRequest(app);