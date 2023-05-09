const express = require('express');
const router = express.Router();

const ratingController = require('../controllers/ratingController');

router.get('/ratings/:name', ratingController.getRatings, (req, res) => {
  console.log('RECEIVED GET REQUEST TO RATINGS');
  return res.status(200).send(res.locals.ratings);
});

router.post('/ratings', ratingController.postRating, (req, res) => {
  console.log('RECEIVED POST REQUEST TO RATINGS');
  res.status(200).send('Successfully posted review');
});

router.put('/ratings', (req, res) => {
  console.log('RECEIVED PUT REQUEST TO RATINGS');
  console.log('req.body: ', req.body);
  const { name, rating, description } = req.body;
  res.send('You updated your rating');
});

router.delete('/ratings', (req, res) => {
  console.log('RECEIVED DELETE REQUEST TO RATINGS');
  console.log('WHATCHU WANNA DELETE?', req.body);
  const { name } = req.body;
  res.send('You deleted rating');
});

module.exports = router;