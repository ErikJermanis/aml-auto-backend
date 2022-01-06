const { db } = require("../utils/admin");

exports.getReservations = (req, res) => {
  db
    .collection("reservations")
    .get()
    .then(snapshot => {
      let reservations = [];
      snapshot.forEach(doc => reservations.push({ id: doc.id, ...doc.data() }));
      return res.json(reservations);
    })
    .catch(err => console.log(err));
};

exports.createReservation = (req, res) => {
  db
    .collection('reservations')
    .add({ ...req.body, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    .then(doc => res.json({ message: `document ${doc.id} created successfully` }))
    .catch(err => res.status(500).json({ error: 'something went wrong' }));
};

exports.deleteReservation = (req, res) => {
  const document = db.doc(`reservations/${req.params.id}`);
  document
    .get()
    .then(doc => {
      if(!doc.exists) {
        return res.status(404).json({ error: 'reservation not found' });
      } else {
        return document.delete();
      }
    })
    .then(() => res.json({ message: 'reservation deleted successfully' }))
    .catch(err => res.status(500).json({ error: 'something went wrong' }));
};