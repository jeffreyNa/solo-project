const { DJ } = require('../models/ratingsDJ');

const ratingController = {};

ratingController.getRatings = async (req, res, next) => {
  console.log('ENTERING getRatings');
  // ok we're going to have to fetch from our database
  const { name } = req.params; // req.params is used to retrieve values from the named parameters in the route path. For example, if you have a route like /users/:id, where id is a named parameter
  try {
    // const ratings = await DJ.findOne({ name: name });
    const rating = await DJ.findOne({ name: name });
    if (rating) {
      console.log("DJ found: ", rating);
      res.locals.rating = rating;
      return next();
    } else {
      return res.status(404).send('Not found');
    }
  } catch (err) {
    console.log('SOMEHOW ENDED UP HERE', err);
    return next({
      log: 'Error in ratingController.getRatings',
      status: 400,
      message: { err: 'Failed to find DJ ratings'},
    });
  };
};

ratingController.postRating = async (req, res, next) => {
  console.log('ENTERING postRating');
  console.log(req.body);
  const { name, rating, description } = req.body;
  try {
    const DJinDB = await DJ.findOne({ name: name });
    console.log('Does it exist? ', JSON.stringify(DJinDB));
    if (DJinDB) {
      DJinDB.rating.push(rating);
      // should call a function to calculate rating 
      DJinDB.description.push(description);
      await DJinDB.save();
    } else {
      const newDJ = new DJ({
        name: name,
        rating: [rating],
        description: [description],
      });
      await newDJ.save();
    }
    return next();
  } catch (err) {
    return next({
      log: 'Error in ratingController.postRating',
      status: 400,
      message: { err: 'Failed to post DJ ratings'},
    });
  };
};

module.exports = ratingController;
