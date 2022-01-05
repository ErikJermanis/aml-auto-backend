const { db } = require("../utils/admin");

exports.getCars = (req, res) => {
  db
    .collection("cars")
    .get()
    .then(snapshot => {
      let cars = [];
      snapshot.forEach(doc => cars.push({ id: doc.id, ...doc.data() }));
      return res.json(cars);
    })
    .catch(err => console.log(err));
};

exports.getSingleCar = (req, res) => {
  db
    .doc(`cars/${req.params.id}`)
    .get()
    .then(snapshot => {
      if(!snapshot.exists) {
        return res.status(404).json({ error: 'car not found' });
      } else {
        return res.json({ id: snapshot.id, ...snapshot.data() });
      }
    });
};

exports.createCar = (req, res) => {
  db
    .collection('cars')
    .add({ ...req.body, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    .then(doc => res.json({ message: `document ${doc.id} created successfully` }))
    .catch(err => res.status(500).json({ error: 'something went wrong' }));
};

exports.updateCar = (req, res) => {
  db
    .doc(`cars/${req.params.id}`)
    .update({ ...req.body, updatedAt: new Date().toISOString() })
    .then(() => res.json({ message: 'car updated successfully' }))
    .catch(err => res.status(500).json({ error: 'something went wrong' }));
};

exports.deleteCar = (req, res) => {
  const document = db.doc(`cars/${req.params.id}`);
  document
    .get()
    .then(doc => {
      if(!doc.exists) {
        return res.status(404).json({ error: 'car not found' });
      } else {
        return document.delete();
      }
    })
    .then(() => res.json({ message: 'car deleted successfully' }))
    .catch(err => res.status(500).json({ error: 'something went wrong' }));
};