const mongoose = require('mongoose');

// NOTE TO SELF TO EASE SETUP - TYPE: brew services list (to see list of all services running on your machine)
// THEN TYPE: brew services start mongodb-community 
const MONGO_URI = "mongodb+srv://jeff-user:OhcSk2i7cb6bNJU7@cluster0.5z6r4sx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'ratings'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const djSchema = new Schema({
  name: String,
  rating: [Number],
  description: [String],
});

// creates a model for the 'dj' collection that will be exported
const DJ = mongoose.model('DJ', djSchema);

// create some mock data for testing
// const newDJ = new DJ({
//   name: 'DJ Diesel',
//   rating: '5',
//   description: 'What can he not do?',
// });

// newDJ.save()
//   .then(() => console.log('SAVED THE DJ'))
//   .catch((err) => console.log(err));

module.exports = { DJ }
